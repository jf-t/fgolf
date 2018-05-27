class Tournament {
    constructor (params) {
        this.tid = params.tid;
        this.name = params.name;

        // need to be iso format
        this.startingDate = params.starting_date;
        this.endingDate = params.ending_date;
    }

    get responseBody()  {
        return {
            'tid': this.tid,
            'name': this.name,
            'startingDate': this.startingDate,
            'endingDate': this.endingDate
        };
    }

    get id () {
        return this.tid;
    }
}

module.exports = Tournament;
