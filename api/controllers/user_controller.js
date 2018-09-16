const User = require('../models/user');
const crypto = require('crypto');
const db = require('../db');


// NOTE: In this controller
//  - login
//  - createUser
//  - getUser
//  - updateSession
//  - checkSession

// TODO:
//  - sign out user

class UserController {
    // getUserCreds sets a request variable for req.userCreds so the signup/signin logic can be seperated
    static getUserCreds (req, res, next) {
        const secret = 'abcdefg';
        const pw_hash = crypto.createHmac('sha256', secret)
                              .update(req.body.password)
                              .digest('hex');

        let userCreds = { username: req.body.username, pw_hash };

        if (req.body.email) { userCreds.email = req.body.email }
        if (req.body.sessionToken) { userCreds.sessionToken = req.body.sessionToken }


        req.userCreds = userCreds;
        next();
    }

    static login (req, res, next) {
        let sql = `
            SELECT
                *
            FROM
                accounts
            WHERE
                accounts.username = $1 AND accounts.pw_hash = $2
        `;

        let values = [req.userCreds.username, req.userCreds.pw_hash];


        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                let user = new User(res.rows[0]);

                user.sessionToken = null;
                req.user = user
                next();
            } else {
                res.status(500).json({'error': 'Bad Credentials'});
            }
        });
    }

    static updateSession (req, res, next) {
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

        // Create session token
        const currentTime = new Date();
        const secret = 'abcdefg';
        const token = crypto.createHmac('sha256', secret + req.body.password + req.body.username)
            .update(currentTime.toUTCString())
            .digest('hex');

        let values = [token, req.user.id];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                req.user = new User(res.rows[0]);
                next();
            } else {
                res.status(500).json({'error': 'No User with that id'})
            }
        });
    }

    static createUser (req, res, next) {
        let sql = `
            INSERT INTO accounts
                (username, pw_hash, email, session_token)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;

        let values = [
            req.userCreds.username,
            req.userCreds.pw_hash,
            req.userCreds.email,
            req.userCreds.sessionToken
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                req.user = new User(res.rows[0]);
                next();
            } else {
                res.status(500).json({'error': 'Create User Failed'})
            }
        });
    }

    static getById (req, res, next) {
        let sql = `
            SELECT
                *
            FROM
                accounts
            WHERE
                accounts.id = $1
        `;

        let values = [req.params.id];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                req.user = new User(res.rows[0]);
                next();
            } else {
                res.status(500).json({'error': 'No User with that ID'});
            }
        });
    }

    static checkSession(req, res, next) {
        let sql = `
            SELECT
                *
            FROM
                accounts
            WHERE
                accounts.session_token = $1
        `;

        let values = [
            req.get('sessionToken')
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                req.user = new User(res.rows[0]);
                next();
            } else {
                res.status(500).json({'error': 'No user with that session token'});
            }
        });
    }
}


module.exports = UserController;
