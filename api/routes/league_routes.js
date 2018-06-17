const routes = require('express').Router();

const LeagueController = require('../controllers/league_controller');
const utils = require('../utils/auth.js');


routes.post('/league', utils.isAuthenticated, (req, res) => {
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


routes.get('/leagues', utils.isAuthenticated, (req, res) => {
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


routes.get('/league/:id', utils.isAuthenticated, (req, res) => {
    let cb = (league, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(league.responseBody);
        }
    };

    LeagueController.getLeague(req.params.id, cb);
});


routes.post('/league/:id/signup', utils.isAuthenticated, (req, res) => {
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

routes.post('/league/:id/initialize/:year', utils.isAuthenticated, (req, res) => {
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

// params: tournamentId, playerIds
routes.post('/league/:id/select_players', utils.isAuthenticated, utils.getLeagueAccountInfo, utils.getAccountTournamentResultsId, (req, res) => {
    let finalCb = (message, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(message);
        }
    };

    let leagueTournamentCb = (leagueTournament, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            let user = req.app.get('user');
            let params = {
                leagueAccountId: user.leagueAccountId,
                leagueTournamentId: leagueTournament.id,
                playerIds: req.body.playerIds,
                accountTournamentResultsId: user.accountTournamentResultsId
            }
            LeagueController.selectPlayers(params, finalCb);
        }
    };

    let leagueTournamentParams = {
        tournamentId: req.body.tournamentId,
        leagueId: parseInt(req.params.id)
    };

    LeagueController.getLeagueTournament(leagueTournamentParams, leagueTournamentCb);
});

routes.get('/league/:id/players', utils.isAuthenticated, utils.getLeagueAccountInfo, utils.getAccountTournamentResultsId, (req, res) => {
    let leagueTournamentCb = (leagueTournament, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            let finalCb = (players, err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(players);
                }
            }

            let params = {
                leagueAccountId: req.app.get('user').leagueAccountId,
                leagueTournamentId: leagueTournament.id
            }

            LeagueController.getAccountTournamentResults(params, finalCb);
        }
    };

    let leagueTournamentParams = {
        tournamentId: req.query.tid,
        leagueId: parseInt(req.params.id)
    };

    LeagueController.getLeagueTournament(leagueTournamentParams, leagueTournamentCb);
});


routes.get('/league/:id/leaderboard', utils.isAuthenticated, (req, res) => {
    let cb = (leaderboard, err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(leaderboard);
        }
    };

    let params = {
        leagueId: req.params.id,
        tournamentId: req.query.tid
    }
    LeagueController.getLeaderboard(params, cb);
});


module.exports = routes;
