const League = require('../models/league');

const db = require('../db');
const TournamentController = require('./tournament_controller');

// NOTE: In this controller:
//  - getUserLeagues
//  - getLeague
//  - createLeague
//  - initiateSettings
//  - updateLeague
//  - getLeagueAccountId
//  - enrollUserInLeague
//  - createSeason
//  - getLeagueTournament
//  - createLeagueTournament
//  - getAccountTournamentResultsId
//  - selectPlayers
//  - selectPlayer
//  - getAccountTournamentResults
//  - getStandings

// TODO:
//  - getMoneyList

class LeagueController {
    static userLeagues(req, res, next) {
        const sql = `
            SELECT
                league.*
            FROM
                league
            JOIN
                league_account
            ON
                league_account.league_id = league.id
            WHERE
                league_account.account_id = $1
        `;

        const values = [
            req.user.id
        ];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                let leagues = response.rows.map((leagueObj) => {
                    let league = new League(leagueObj);

                    return league.responseBody;
                });

                req.leagues = leagues;
                next();
            } else {
                res.status(500).json(err || {'error': 'No Leagues for logged in User'});
            }
        });
    }

    static get (req, res, next) {
        // TODO:
        //  - get standings
        //  - get this, next week tournaments
        //  - get money list
        //  - get leaderboard

        const sql = `
            SELECT
                *
            FROM
                league
            WHERE
                id = $1
        `;

        const values = [req.params.leagueId];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                req.league = new League(response.rows[0]);
                next();
            } else {
                res.status(500).json(err || {'error': 'No League with that ID'});
            }
        });
    }

    static post (req, res, next) {
        const sql = `
            INSERT INTO league
                (name, commish_id, private, pw_hash)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;


        let user = req.user;

        const values = [
            req.body.name,
            user.id,
            req.body.private || false,
            req.body.pw_hash || null
        ];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                let league = new League(response.rows[0])

                req.league = league;
                req.userId = user.id;

                next();
            } else {
                res.status(500).json(err);
            }
        });
    }

    static initiateSettings(req, res, next) {
        const sql = `
            INSERT INTO settings
                (league_id)
            VALUES
                ($1)
            RETURNING *
        `;

        const values = [req.league.id];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                req.league.settings = response.rows[0];
                next();
            } else {
                res.status(500).json({'error': err, 'msg': 'I dont know why this would happen'});
            }
        });
    }


    static enrollUser (req, res, next) {
        // Validate that account_id, league_id are unique

        const sql = `
            INSERT INTO league_account
                (account_id, league_id)
            VALUES
                ($1, $2)
            RETURNING
                *
        `;

        const values = [
            req.userId || req.user.id,
            req.league.id
        ];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                req.league.addUser(response.rows[0]);
                next();
            } else {
                res.status(500).json(err || {"error": "Error in Enrolling user"});
            }
        });
    }


    static updateLeague (params, cb) {
        const sql = `
            UPDATE
                league
            SET
                name = $1, commish_id = $2, private = $3, pw_hash = $4
            WHERE
                id = $5
            RETURNING
                *
        `;

        const values = [
            params.name,
            params.commish_id,
            params.private,
            params.pw_hash,
            params.leagueId
        ];

        db.query(sql, values, (err, response) => {
            if (response && response.rows[0]) {
                cb(new League(response.rows[0]));
            } else {
                cb(null, err || {'error': 'No League with that ID'})
            }
        });
    }


    static getLeagueAccountId(params, cb) {
        const sql = `
            SELECT
                id
            FROM
                league_account
            WHERE
                league_id = $1 AND account_id = $2
        `;

        const values = [
            params.leagueId,
            params.accountId
        ];

        db.query(sql, values, (err, response) => {
            if (response) {
                cb(response.rows[0].id);
            } else {
                cb(null, err);
            }
        });
    }


    static createSeason (params, cb) {
        let contCb = (tournaments, err) => {
            if (err) {
                console.log(err);
                cb(null, err);
            } else {
                tournaments.forEach(tournament => {
                    LeagueController.createLeagueTournament({
                        leagueId: params.leagueId,
                        tournamentId: tournament.tid
                    });
                });

                cb(tournaments);
            }
        };

        TournamentController.getSeasonByYear(params.year, contCb);
    }



    static getLeagueTournament (params, cb) {
        const sql = `
            SELECT
                *
            FROM
                league_tournament
            WHERE
                league_id = $1 AND tournament_id = $2
        `;

        const values = [
            params.leagueId,
            params.tournamentId
        ];

        db.query(sql, values, (err, response) => {

            if (response && response.rows[0]) {
                cb(response.rows[0]);
            } else {
                cb(null, err);
            }
        });
    }


    static createLeagueTournament (params, cb) {
        const sql = `
            INSERT INTO league_tournament
                (league_id, tournament_id)
            VALUES
                ($1, $2)
            RETURNING *
        `;

        const values = [
            params.leagueId,
            params.tournamentId
        ];

        db.query(sql, values, (err, response) => {
        if (response) {
                if (!cb) {
                    console.log({'message': 'Created League Tournament ' + response.rows[0].tournament_id});
                } else {
                    cb(response.rows[0]);
                }
            } else {
                console.error(err);
            }
        });
    }


    static getAccountTournamentResultsId (params, cb) {
        const sql = `
            SELECT
                id
            FROM
                account_tournament_results
            WHERE
                league_tournament_id = (
                    SELECT
                        id
                    FROM
                        league_tournament
                    WHERE
                        league_tournament.tournament_id = $1
                ) AND league_account_id = $2
        `;

        const values = [
            params.tournamentId,
            params.leagueAccountId
        ];


        db.query(sql, values, (err, response) => {
            if (response) {
                cb(response.rows[0]);
            } else {
                cb(null, err);
            }
        });
    }

    static selectPlayers(params, cb) {
        if (!params.accountTournamentResultsId) {
            // create account_tournament_results for account_player_tournament to reference
            const sql = `
                INSERT INTO account_tournament_results
                    (league_tournament_id, league_account_id)
                VALUES
                    ($1, $2)
                RETURNING *
            `;

            const values = [
                params.leagueTournamentId,
                params.leagueAccountId
            ];

            db.query(sql, values, (err, response) => {
                if (response) {
                    let accountTournamentResultsId = response.rows[0].id;

                    params.playerIds.forEach(playerId => {
                        LeagueController.selectPlayer({
                            playerId,
                            accountTournamentResultsId
                        });
                    });

                    cb({'message': 'Successfully Selected Players'});
                }
            });
        } else {
            console.log(params.accountTournamentResultsId);
            params.playerIds.forEach(playerId => {
                LeagueController.selectPlayer({
                    playerId,
                    accountTournamentResultsId: params.accountTournamentResultsId.id
                });
            });

            cb({'message': 'Successfully Selected Players'});
        }
    }

    static selectPlayer (params, cb) {
        const sql = `
            INSERT INTO account_player_tournament
                (account_tournament_results_id, player_tournament_id)
            VALUES
                ($1, (
                    SELECT
                        id
                    FROM
                        player_tournament
                    WHERE
                        player_id = $2
                ))
            RETURNING *
        `;

        const values = [
            params.accountTournamentResultsId,
            params.playerId
        ];

        db.query(sql, values, (err, response) => {
            if (!cb) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('account_player_tournament ' + response.rows[0].id);
                }
            } else {
                if (response && response.rows[0]) {
                    cb(response.rows[0]);
                } else {
                    cb(null, err);
                }
            }
        });
    }

    static getAccountTournamentResults (params, cb) {
        const sql = `
            SELECT
                player_tournament.*, player.name
            FROM
                account_tournament_results
            JOIN
                account_player_tournament
            ON
                account_player_tournament.account_tournament_results_id = account_tournament_results.id
            JOIN
                player_tournament
            ON
                account_player_tournament.player_tournament_id = player_tournament.id
            JOIN
                player
            ON
                player_tournament.player_id = player.pga_id
            WHERE
                account_tournament_results.league_tournament_id = $1 AND
                account_tournament_results.league_account_id = $2
            GROUP BY
                account_tournament_results.id, player_tournament.id, player.pga_id
            ORDER BY
                player_tournament.total
        `;

        const values = [
            params.leagueTournamentId,
            params.leagueAccountId
        ];


        db.query(sql, values, (err, response) => {
            console.log(response.rows);
            if (response) {
                cb(response.rows);
            } else {
                console.log(err);
                cb(null, err || {
                    'error': 'No Account Tournament Results with those params',
                    'params': params
                });
            }
        });
    }

    static getStandings (params, cb) {
        const sql = `
            SELECT
                league_tournament.id as league_tournament_id,
                league_account.id as league_account_id,
                accounts.username
            FROM
                league
            JOIN
                league_tournament
            ON
                league_tournament.league_id = league.id

            JOIN
                league_account
            ON
                league_account.league_id = league.id

            JOIN
                accounts
            ON
                accounts.id = league_account.account_id

            WHERE
                league_account.league_id = $1 AND
                league_tournament.tournament_id = $2
        `;

        const values = [
            parseInt(params.leagueId),
            params.tournamentId
        ];

        db.query(sql, values, (err, response) => {
            if (response) {
                response.rows.forEach(user => {
                    let results = [];
                    let completeCb = (tournamentResults) => {
                        results.push(tournamentResults);

                        if (results.length === response.rows.length) {
                            let score = 0;

                            console.log(results[0]);
                            results.forEach(team => {
                                let max = team.length; // need to configure settings to count specific number of players
                                for (var i = 0; i < max; i++) {
                                    score += team[i].total;
                                }
                            });

                            console.log(results, score);
                            cb({ players: results, score });
                        }
                    }

                    let params = {
                        leagueTournamentId: user.league_tournament_id,
                        leagueAccountId: user.league_account_id
                    };


                    LeagueController.getAccountTournamentResults(params, completeCb);
                });
            } else {
                console.log(err);
            }
        });
    }

    static formattedLeaderboardEntry (results) {
        // results = id, player_id, tournament_id, total, today, thru, r1, r2, r3, r4, name


    }

}

module.exports = LeagueController;
