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

routes.post('/league/:id/initialize/:year', (req, res) => {
    let cb = (tournaments, err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(tournaments);
        }
    };

    let params = {
        'year': req.params.year,
        'leagueId': req.params.id
    };

    LeagueController.createSeason(params, cb);
});


route.post('/league/:id/select_players', (req, res) => {
    let cb = (message, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(message);
        }
    };

    // Need to get leagueAccountId from league_id and account_id
    // Get league_tournament_id from tournament_id in req.body
    // playerTournamentIds from req.body either from player_id and tournament_id
    //    or just player_tournament_id

    let params = {
        leagueAccountId: leagueAccountId,
        leagueTournamentId: leagueTournamentId,
        playerTournamentIds: []
    }

    LeagueController.selectPlayers(params, cb);
});


module.exports = routes;
