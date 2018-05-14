const { Client } = require('pg')
const client = new Client()

const User = require('../models/user.js');



class UserController {
    static login (params) {
        // db query
        // check if db object = params.username
        //  and crypt(params.password)

        // return json object of neccessary info
    }

    static createUser (params) {
        // create User object & validate correct params
        // if good: send to DB
        // if bad send bad response back

        await client.connect()

        const user = await client.query('''
                INSERT INTO users
                    (username, pw_hash, email, session_token)
                VALUES
                    ($1, $2, $3, $4)
                RETURNING
                    *
            ''', [
                params.username,
                params.pw_hash,
                params.email,
                params.session_token
            ]
        );

        await client.end()

        console.log(user);


        // create user object with User class
        return user;
    }

    static getUser (params) {
        let userId = params.userId;

        // query DB for user id
        // then send user.publicInfo
    }
}


module.exports = UserController;
