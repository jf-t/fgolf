const routes = require('express').Router();

const tournament = require('../controllers/tournament_controller');
const user = require('../controllers/user_controller');

// TODO:
//  - /initiate also needs to update most recent scores. (/update)
//  - create full season schedule endpoint ***




routes.post('/tournament', user.userFromSession, tournament.post, tournament.scrape, tournament.initiateTournamentPlayers, tournament.updateTournamentScores, (req, res) => {
    if (req.tournament) {
        res.status(200).json(req.tournament.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue post /tournament'});
    }
});



routes.get('/tournament/:id', user.userFromSession, tournament.get, (req, res) => {
    if (req.tournament) {
        res.status(200).json(req.tournament.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue get /tournament'});
    }
});

routes.post('/tournament/:id/initiate', user.userFromSession, (req, res) => {
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


routes.post('/tournament/:id/update', user.userFromSession, (req, res) => {
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



routes.get('/tournament/:id/leaderboard', user.userFromSession, (req, res) => {
    let cb = (leaderboard, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(leaderboard);
        }
    }

    TournamentController.getTournamentLeaderboard(req.params.id, cb);
});

routes.post('/tournament/:season/create', (req, res) => {
    TournamentController.initiateSeason(req.params.season);
});



module.exports = routes;
