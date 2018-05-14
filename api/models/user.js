class User {
    constructor (params) {
        this.username = params.username;
        this.pw_hash = params.pw_hash;

        this.email = params.email;
        this.sessionToken = params.sessionToken;
    }


    get responseBody () {
        return {
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
