const UserController = require('../controllers/user_controller');

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

        UserController.checkSession(req.get('sessionToken'), cb);
    }
};

module.exports = isAuthenticated;
