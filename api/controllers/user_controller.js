const User = require('../models/user.js');

const db = require('../db');


class UserController {
    static login (params, cb) {
        let sql = `
            SELECT
                *
            FROM
                accounts
            WHERE
                accounts.username = $1 AND accounts.pw_hash = $2
        `;

        let values = [
            params.username,
            params.pw_hash
        ];

        db.query(sql, values, (err, res) => {
            if (res) {
                let user = new User(res.rows[0]);

                // remove session token for auth route recursive function to work
                user.sessionToken = null;
                cb(user);
            } else {
                cb (null, err);
            }
        });
    }


     static createUser (params, cb) {
        let sql = `
            INSERT INTO accounts
                (username, pw_hash, email, session_token)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;

        let values = [
            params.username,
            params.pw_hash,
            params.email,
            params.session_token
        ];

        db.query(sql, values, (err, res) => {
            if (res) {
                cb(new User(res.rows[0]));
            } else {
                cb(null, err);
            }
        });
    }


    static getUser (params) {
        let sql = `
            SELECT
                *
            FROM
                accounts
            WHERE
                accounts.id = $1
        `;

        let values = [params.userId];

        db.query(sql, values, (err, res) => {
            if (res) {
                cb(new User(res.rows[0]));
            } else {
                cb(null, err)
            }
        });
    }

    static updateSession(params, cb) {
        console.log(params);
        let sql = `
            UPDATE
                accounts
            SET
                session_token = $1
            WHERE
                id = $2
            RETURNING
                *
        `;

        let values = [params.token, params.userId];

        db.query(sql, values, (err, res) => {
            if (res) {
                console.log(res);
                cb(new User(res.rows[0]));
            } else {
                console.log(err);
                cb(null, err);
            }
        });
    }
}


module.exports = UserController;
