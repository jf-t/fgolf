const routes = require('express').Router();

const TournamentController = require('../controllers/tournament_controller');
const isAuthenticated = require('../utils/auth.js');



routes.get('/tournament/:id', isAuthenticated, (req, res) => {
    let cb = (tournament, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(tournament);
        }
    }

    TournamentController.getTournament(req.params.id, cb);
});


routes.post('/tournament', (req, res) => {
    let cb = (tournament, err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(tournament);
        }
    }

    const params = {
        'tid': req.body.tid,
        'name': req.body.name,
        'startingDate': req.body.startingDate,
        'endingDate': req.body.endingDate
    };

    TournamentController.createTournament(params, cb);
});




module.exports = routes;
