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
    }
}


module.exports = UserController;
