const Player = require('../models/player');

const db = require('../db');

class PlayerController {
    static getPlayer(playerId, cb) {
        const sql = `
            SELECT
                *
            FROM
                player
            WHERE
                pga_id = $1
        `;

        const values = [playerId];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Player(res.rows[0]));
            } else {
                cb(null, err);
            }
        });
    }

    static createPlayer(params, cb) {
        const sql = `
            INSERT INTO player
                (pga_id, name)
            VALUES
                ($1, $2)
            RETURNING
                *
        `;

        const values = [
            params.playerId,
            params.name
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(new Player(res.rows[0]));
            } else {
                cb(null, err || {'error': 'Error with Creating Player'});
            }
        });
    }

    static createPlayerTournament (params, cb) {
        const sql = `
            INSERT INTO player_tournament
                (player_id, tournament_id)
            VALUES
                ($1, $2)
            RETURNING
                *
        `;

        const values = [
            params.playerId,
            params.tournamentId
        ];

        db.query(sql, values, (err, res) => {
            if (!cb) {
                console.log('Created Player Tournament');
            } else {
                if (res && res.rows[0]) {
                    cb(res.rows[0]);
                } else {
                    cb(null, err || {'error': 'Something went wrong (create player_tournament)'});
                }
            }
        });
    }

    static updatePlayerTournamentScore (params, cb) {
        const sql = `
            UPDATE
                player_tournament
            SET
                total = $1, today = $2, thru = $3,
                r1 = $4, r2 = $5, r3 = $6, r4 = $7
            WHERE
                tournament_id = $8 AND player_id = $9
            RETURNING
                *
        `;

        let rounds = params.rounds.map(round => {
            return round.strokes || null;
        });

        const values = [
            params.total,
            params.today,
            params.thru,

            rounds[0],
            rounds[1],
            rounds[2],
            rounds[3],

            params.tournamentId,
            params.playerId
        ];

        db.query(sql, values, (err, res) => {
            if (res && res.rows[0]) {
                cb(true);
            } else {
                cb(null, err);
            }
        });
    }
}

module.exports = PlayerController;
