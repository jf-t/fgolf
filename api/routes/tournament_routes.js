const routes = require('express').Router();

const TournamentController = require('../controllers/tournament_controller');
const utils = require('../utils/auth.js');



routes.get('/tournament/:id', utils.isAuthenticated, (req, res) => {
    let cb = (tournament, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(tournament);
        }
    }

    TournamentController.getTournament(req.params.id, cb);
});


routes.post('/tournament', utils.isAuthenticated, (req, res) => {
    let cb = (tournament, err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(tournament);
        }
    }

    let season = null;
    if (!req.body.year) {
        season = parseInt(req.body.startingDate.split('-')[0]);
    } else {
        season = req.body.year;
    }

    const params = {
        'tid': req.body.tid,
        'name': req.body.name,
        'season': season,
        'startingDate': req.body.startingDate,
        'endingDate': req.body.endingDate
    };

    TournamentController.createTournament(params, cb);
});

routes.post('/tournament/:id/initiate', utils.isAuthenticated, (req, res) => {
    // use statdata.pgatour to scrape and update tournament scores
    let cb = (message, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(message);
        }
    };
    TournamentController.initiateTournamentPlayers(req.params.id, cb);
});


routes.post('/tournament/:id/update', utils.isAuthenticated, (req, res) => {
    // use statdata.pgatour to scrape and update tournament scores
    let cb = (message, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(message);
        }
    };
    TournamentController.updateTournamentScores(req.params.id, cb);
});



routes.get('/tournament/:id/leaderboard', utils.isAuthenticated, (req, res) => {
    let cb = (leaderboard, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(leaderboard);
        }
    }

    TournamentController.getTournamentLeaderboard(req.params.id, cb);
});



module.exports = routes;
