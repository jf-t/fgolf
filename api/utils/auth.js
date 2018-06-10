const UserController = require('../controllers/user_controller');
const LeagueController = require('../controllers/league_controller');

const isAuthenticated = (req, res, next) => {
    let sessionToken = req.get('sessionToken');

    if (!sessionToken) {
        res.status(500).json({'error': 'Not Authenticated! - Send Token Header'});
    } else {
        let cb = (user, err) => {
            if (err) {
                console.log(err);
                res.status(500).json({'error': 'Not Authenticated! - No user with that token'});
            } else {
                req.app.set('user', user);
                next();
            }
        }

        UserController.checkSession(sessionToken, cb);
    }

};

const getLeagueAccountId = (req, res, next) => {
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

module.exports = {
    isAuthenticated: isAuthenticated,
    getLeagueAccountId: getLeagueAccountId
};
