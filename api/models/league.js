class League {
    constructor (params) {
        this.id = params.id;
        this.name = params.name;
        this.commishId = params.commish_id;
        this.pwHash = params.pw_hash;
        this.private = params.private || false;

        this.settings = params.settings ? params.settings : {};
    }

    get responseBody () {
        return {
            id: this.id,
            name: this.name,
            commishId: this.commishId,
            private: this.private,
            settings: this.settings
        }
    }

}

module.exports = League;
