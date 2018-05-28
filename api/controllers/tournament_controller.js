const https = require('https');
const db = require('../db');


const Tournament = require('../models/tournament');
const Player = require('../models/player');

const PlayerController = require('./player_controller');


class TournamentController {

    static getTournament (tournamentId, cb) {
        const sql = `
            SELECT
                *
            FROM
                tournament
            WHERE
                tid = $1
        `;

        const values = [tournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Tournament(res.rows[0]));
            } else {
                cb(null, err || {'error': 'There is no tournament with that ID'});
            }
        });
    }

    static getSeasonByYear (year, cb) {
        const sql = `
            SELECT
                *
            FROM
                tournament
            WHERE
                season = $1
        `;

        const values = [year];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                const formattedTournaments = res.rows.map(tournament => {
                    let formattedTournament = new Tournament(tournament);
                    return formattedTournament.responseBody;
                });

                cb(formattedTournaments);
            } else {
                cb(null, err);
            }
        });
    }


    static createTournament (params, cb) {
        const sql = `
            INSERT INTO tournament
                (tid, name, season, starting_date, ending_date)
            VALUES
                ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [
            params.tid,
            params.name,
            params.season,
            params.startingDate,
            params.endingDate
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Tournament(res.rows[0]));
            } else {
                cb(null, err || {'error': 'Some error with creating '})
            }
        });
    }

    static initiateTournamentPlayers (tournamentId, cb) {
        https.get('https://statdata.pgatour.com/r/' + tournamentId + '/leaderboard-v2mini.json', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on('end', () => {
                let players = JSON.parse(data).leaderboard.players;

                let index = 0;
                let insertedPlayers = [];
                players.forEach((playerObj) => {
                    let playerId = playerObj.player_id;

                    let playerCreateCb = (player, err) => {
                        if (player) {
                            insertedPlayers.push(player);
                            index += 1;
                            if (index === players.length) {
                                cb(insertedPlayers);
                            }

                            PlayerController.createPlayerTournament({playerId, tournamentId});
                        } else {
                            if (err) {
                                console.log(err);
                                cb(null, err);
                            } else {
                                const params = {
                                    playerId,
                                    name: playerObj.player_bio.first_name + ' ' + playerObj.player_bio.last_name
                                };

                                PlayerController.createPlayer(params, playerCreateCb);
                            }
                        }
                    }


                    PlayerController.getPlayer(playerId, playerCreateCb);
                });
            });
        });
    }

    static updateTournamentScores (tournamentId, cb) {
        // scrape statdata.pgatour
        // on success, parse JSON data, get player ids, send to PlayerController

        // https://statdata.pgatour.com/r/014/leaderboard-v2mini.json

        https.get('https://statdata.pgatour.com/r/' + tournamentId + '/leaderboard-v2mini.json', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on('end', () => {
                let players = JSON.parse(data).leaderboard.players;

                let index = 0;
                let innerCb = (success, err) => {
                    if (err) {
                        cb(null, err);
                    } else {
                        if (success) {index += 1 }

                        if (index === players.length) {
                            cb({'message': 'Player Update Successful'});
                        }
                    }
                }
                players.forEach((playerObj, index) => {
                    let playerId = playerObj.player_id;

                    const params = {
                        playerId,
                        tournamentId,
                        total: parseInt(playerObj.total),
                        today: (playerObj.today !== null) ? parseInt(playerObj.today) : null,
                        thru: playerObj.thru,
                        rounds: playerObj.rounds
                    };


                    PlayerController.updatePlayerTournamentScore(params, innerCb);
                });
            });
        });
    }


    static getLeaderboard(tournamentId, cb) {
        const sql = `
            SELECT
                *
            FROM
                player_tournament
            JOIN
                player
            ON
                player.pga_id = player_tournament.player_id
            WHERE
                tournament_id = $1
            ORDER BY
                total ASC
        `;

        const values = [tournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                let formattedPlayers = [];
                res.rows.forEach(player => {
                    formattedPlayers.push(new Player(player));
                });
                cb(res.rows);
            } else {
                cb(null, err);
            }
        });
    }

    static getLeagueTournament (leagueTournamentId, cb) {
        const sql = `
            SELECT
                *
            FROM
                league_tournament
            JOIN
                account_tournament_results
            ON
                account_tournament_results.league_tournament_id = league_tournament.id
            WHERE
                league_tournament.id = $1
        `;

        const values = [leagueTournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(res.rows);
            }
        });
    }

    static createLeagueTournamentLeaderboard (league_tournament_id, cb) {
        const sql = `
            SELECT
                account.username, account.id, COUNT(player_tournament.total) as total_score, player.name as player_name, player.id as player_id
            FROM
                account
            JOIN
                league_account
            ON
                account.id = league_account.account_id
            JOIN
                account_tournament_results
            ON
                account_tournament_results.league_account_id = league_account.id
            JOIN
                account_player_tournament
            ON
                account_player_tournament.account_tournament_results_id = account_tournament_results.id
            JOIN
                league_tournament
            ON
                league_tournament.id = account_tournament_results.league_tournament.id
            JOIN
                player_tournament
            ON
                account_player_tournament.player_tournament_id = player_tournament.id
            JOIN
                player
            ON
                player_tournament.player_id = player.pga_id
            WHERE
                league_tournament.id = $1
        `;

        const values = [leagueTournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(res.rows);
            }
        });
    }

}



module.exports = TournamentController;
