const routes = require('express').Router();

const LeagueController = require('../controllers/league_controller');
const isAuthenticated = require('../utils/auth.js');



routes.get('/leagues', isAuthenticated, (req, res) => {
    let user = req.app.get('user');

    let cb = (league, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(leagues);
        }
    };

    LeagueController.getUserLeagues(user.id, cb);
});


routes.get('/league/:id', isAuthenticated, (req, res) => {
    let cb = (league, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(league.responseBody);
        }
    };

    LeagueController.getLeague(req.params.id, cb);
});


routes.post('/league', isAuthenticated, (req, res) => {
    let cb = (league, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(league.responseBody);
        }
    };

    let user = req.app.get('user');

    let params = {
        'name': req.body.name,
        'commishId': user.id,
        'private': req.body.private || false,
        'pw_hash': req.body.pw_hash || null
    };

    LeagueController.createLeague(params, cb);
});


routes.post('/league/:id/signup', isAuthenticated, (req, res) => {
    let cb = (league_account, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(league_account);
        }
    };

    const params = {
        accountId: req.body.accountId,
        leagueId: req.params.id
    };


    LeagueController.enrollUserInLeague(params, cb);
});


module.exports = routes;
