const routes = require('express').Router();

const user = require('../controllers/user_controller');
const league = require('../controllers/league_controller');

const utils = require('../utils/auth.js');


// TODO:
//  - search leagues by name
//  - edit selections (before thursday)


// Create League
routes.post('/league', user.userFromSession, league.post, league.initiateSettings, league.enrollUser, (req, res) => {
    if (req.league) {
        res.status(200).json(req.league.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue post /league'});
    }
});

// Get User Leagues
routes.get('/leagues', user.userFromSession, league.userLeagues, (req, res) => {
    if (req.leagues) {
        res.status(200).json(req.leagues);
    } else {
        res.status(500).json({'error': 'Unregistered issue get /leagues'});
    }
});


// Get League by ID
routes.get('/league/:id', user.userFromSession, (req, res) => {
    // this request needs to return enough information to fill out entire league section..
    //  this week standings, overall money list, leaderboard
    let cb = (league, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(league.responseBody);
        }
    };

    LeagueController.getLeague(req.params.id, cb);
});


// Sign up user for league
routes.post('/league/:id/signup', user.userFromSession, (req, res) => {
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

// Initialize year of tournaments
routes.post('/league/:id/initialize/:year', user.userFromSession, (req, res) => {
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

// Select players for league tournament account
// params: tournamentId, playerIds
routes.post('/league/:id/select_players', user.userFromSession, utils.getLeagueAccountInfo, utils.getAccountTournamentResultsId, (req, res) => {
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

// Get league players
routes.get('/league/:id/players', user.userFromSession, utils.getLeagueAccountInfo, utils.currentTournamentId, (req, res) => {
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
        tournamentId: req.tid,
        leagueId: parseInt(req.params.id)
    };


    LeagueController.getLeagueTournament(leagueTournamentParams, leagueTournamentCb);
});


// Get league standings
routes.get('/league/:id/standings', user.userFromSession, utils.currentTournamentId, (req, res) => {
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
        tournamentId: req.tid // get current tournament id has to exist
    };

    LeagueController.getStandings(params, cb);
});


module.exports = routes;
