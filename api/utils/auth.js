const UserController = require('../controllers/user_controller');
const LeagueController = require('../controllers/league_controller');
const TournamentController = require('../controllers/tournament_controller');

const getLeagueAccountInfo = (req, res, next) => {
    let user = req.app.get('user');



    let accountId = user.id;
    let leagueId = req.params.id;


    let cb = (leagueAccountId, err) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error': err});
        } else {
            user.leagueAccountId = leagueAccountId;

            req.app.set('user', user);
            next();
        }
    }

    let params = { leagueId, accountId };

    LeagueController.getLeagueAccountId(params, cb);
};

const getAccountTournamentResultsId = (req, res, next) => {
    console.log(req.tid);
    if (req.tid || req.body.tournamentId) {
        let cb = (accountTournamentResultsId , err) => {
            if (err) {
                res.status(500).json({ 'error': err });
            } else {
                let user = res.app.get('user');
                user.accountTournamentResultsId = accountTournamentResultsId;

                req.app.set('user', user);
                next();
            }
        };

        let leagueAccountId = req.app.get('user').leagueAccountId;

        let tournamentId = req.tid ?
                           req.tid :
                           req.body.tournamentId;


        let params = { leagueAccountId, tournamentId };

        LeagueController.getAccountTournamentResultsId(params, cb)
    }
};

const currentTournamentId = (req, res, next) => {
    if (req.query.tid) {
        req.tid = req.query.tid;
        next();
    } else {
        let cb = (tournament, err) => {
            if (err || (!tournament)) {
                res.status(500).json({'error': err || 'Tournament is null'});
            } else {
                req.tid = tournament.tid;
                next();
            }
        }

        TournamentController.getCurrentTournament(cb);
    }
};

module.exports = {
    getLeagueAccountInfo: getLeagueAccountInfo,
    getAccountTournamentResultsId: getAccountTournamentResultsId,
    currentTournamentId: currentTournamentId
};
