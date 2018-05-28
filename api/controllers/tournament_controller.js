const https = require('https');
const db = require('../db');


const Tournament = require('../models/tournament');
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


    static createTournament (params, cb) {
        const sql = `
            INSERT INTO tournament
                (tid, name, starting_date, ending_date)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;

        const values = [
            params.tid,
            params.name,
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
            WHERE
                tournament_id = $1
            ORDER BY
                total ASC
        `;

        const values = [tournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(res.rows);
            } else {
                cb(null, err);
            }
        });
    }

}



module.exports = TournamentController;
