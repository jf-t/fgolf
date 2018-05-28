class Player {
    constructor (params) {
        this.pgaId = params.pga_id;
        this.name = params.name;

        this.total = params.total;
        this.today = params.today;
        this.thru = params.thru;

        this.rounds = [params.r1, params.r2, params.r3, params.r4];
    }
}

module.exports = Player;
