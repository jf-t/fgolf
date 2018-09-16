class League {
    constructor (params) {
        this.id = params.id;
        this.name = params.name;
        this.commishId = params.commish_id;
        this.pwHash = params.pw_hash || null;
        this.private = params.private || false;

        this.settings = params.settings ? params.settings : {};
        this.users = params.users ? params.users : [];
    }

    get responseBody () {
        return {
            id: this.id,
            name: this.name,
            commishId: this.commishId,
            private: this.private,
            settings: this.settings,
            users: this.users
        };
    }


    addUser (user) {
        // TODO: ensure no duplicates
        this.users.push(user);
    }

}

module.exports = League;
