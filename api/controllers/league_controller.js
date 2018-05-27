const League = require('../models/league');

const db = require('../db');


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
                cb(err);
            }
        });
    }
}

module.exports = LeagueController;
