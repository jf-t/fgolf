const client = require('../psql/server.js');
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
        return client.query(`
            INSERT INTO accounts
                (username, pw_hash, email, session_token)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `)
        .then(res => {
            console.log(res.rows[0]);

            return res.rows[0];
        }).catch(e => {
            debugger;
            console.error(e.stack)
        });
    }

    static getUser (params) {
        let userId = params.userId;

        // query DB for user id
        // then send user.publicInfo
    }
}


module.exports = UserController;
