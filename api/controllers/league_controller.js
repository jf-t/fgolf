const League = require('../models/league');

const db = require('../db');
const TournamentController = require('./tournament_controller');

class LeagueController {
    static getUserLeagues(userId, cb) {
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
            userId
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                let leagues = res.rows.map((leagueObj) => {
                    let league = new League(leagueObj);

                    return league.responseBody;
                });

                cb(leagues);
            } else {
                cb(null, err || {'error': 'No Leagues for logged in User'});
            }
        });
    }

    static getLeague (leagueId, cb) {
        const sql = `
            SELECT
                *
            FROM
                league
            WHERE
                id = $1
        `;

        const values = [leagueId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new League(res.rows[0]));
            } else {
                cb(null, err || {'error': 'No League with that ID'});
            }
        });
    }

    static createLeague (params, cb) {
        const sql = `
            INSERT INTO league
                (name, commish_id, private, pw_hash)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;

        const values = [
            params.name,
            params.commishId,
            params.private,
            params.pw_hash
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                let league = new League(res.rows[0])

                this.enrollUserInLeague({
                    leagueId: league.id,
                    accountId: params.commishId
                }, (res) => {
                    console.log(res);
                    cb(leagues);
                });
            } else {
                cb(null, err);
            }
        });
    }

    static initiateSettings(league) {
        const sql = `
            INSERT INTO settings
                (league_id)
            VALUES
                ($1)
        `;

        const values = [league.id];

        db.query(sql, values, (err, res) => {
            if (res) {
                console.log("Settings Initiated on League " + league.id);
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

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new League(res.rows[0]));
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

        db.query(sql, values, (err, res) => {
            if (res) {
                cb(res.rows[0].id);
            } else {
                cb(null, err);
            }
        });
    }


    static enrollUserInLeague(params, cb) {
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
            params.accountId,
            params.leagueId
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.body[0]) {
                cb({'message': 'Successfully enrolled'})
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

        db.query(sql, values, (err, res) => {

            if (res && res.rows[0]) {
                cb(res.rows[0]);
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

        db.query(sql, values, (err, res) => {
            if (res) {
                if (!cb) {
                    console.log({'message': 'Created League Tournament ' + res.rows[0].tournament_id});
                } else {
                    cb(res.rows[0]);
                }
            } else {
                console.error(err);
            }
        });
    }

    static selectPlayers(params, cb) {
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

        db.query(sql, values, (err, res) => {
            if (res) {
                let accountTournamentResultsId = res.rows[0].id;

                params.playerIds.forEach(playerId => {
                    LeagueController.selectPlayer({
                        playerId,
                        accountTournamentResultsId
                    });
                });

                cb({'message': 'Successfully Selected Players'});
            }
        });
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

        db.query(sql, values, (err, res) => {
            if (!cb) {
                console.log('account_player_tournament ' + res.rows[0].id);
            } else {
                if (!cb) {
                    console.log(res, err);
                } else {
                    if (res && res.rows[0]) {
                        cb(res.rows[0]);
                    } else {
                        cb(null, err);
                    }
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
        `;

        const values = [
            params.leagueTournamentId,
            params.leagueAccountId
        ];

        db.query(sql, values, (err, res) => {
            if (res) {
                cb(res.rows);
            } else {
                cb(null, err || {
                    'error': 'No Account Tournament Results with those params',
                    'params': params
                });
            }
        });
    }
}

module.exports = LeagueController;
