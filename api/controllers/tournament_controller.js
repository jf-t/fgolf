const Tournament = require('../models/tournament');

const db = require('../db');


class TournamentController {

    static getTournament (tournamentId, cb) {
        const sql = `
            SELECT
                *
            FROM
                tournament
            WHERE
                id = $1
        `;

        const values = [tournamentId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Tournament(res.rows[0]));
            } else {
                cb(null, err || {'error': 'There is no tournament with that ID'});
            }
        });
    }


    static createTournament (params, cb) {
        const sql = `
            INSERT INTO tournament
                (tid, name, starting_date, ending_date)
            VALUES
                ($1, $2, $3, $4)
            RETURNING
                *
        `;

        const values = [
            params.tid,
            params.name,
            params.startingDate,
            params.endingDate
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Tournament(res.rows[0]));
            } else {
                cb(null, err || {'error': 'Some error with creating '})
            }
        });
    }

}



module.exports = TournamentController;
