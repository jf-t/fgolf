class User {
    constructor (params) {
        this.id = params.id;
        this.username = params.username;
        this.pw_hash = params.pw_hash;

        this.email = params.email;
        this.sessionToken = params.session_token;

        // this is set if using league routes in middleware
        this.leagueAccountId = null;
    }


    get responseBody () {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            sessionToken: this.sessionToken
        };
    }

    get publicInfo () {
        return {
            username: this.username,
            email: this.email
        };
    }
}


module.exports = User;
