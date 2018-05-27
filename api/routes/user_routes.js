const routes = require('express').Router();
const crypto = require('crypto');

const UserController = require('../controllers/user_controller');

routes.post('/auth', (req, res) => {
    // Hash password
    const secret = 'abcdefg';
    const pw_hash = crypto.createHmac('sha256', secret)
                       .update(req.body.password)
                       .digest('hex');

    let params = {
        'username': req.body.username,
        'pw_hash': pw_hash
    };

    let cb = (user, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (user.sessionToken) {
                res.status(200).json(user.responseBody);
            } else {
                // Create session token
                const currentTime = new Date();
                const token = crypto.createHmac('sha256', secret)
                    .update(currentTime.toUTCString())
                    .digest('hex');

                console.log(user);
                let params = {
                    userId: user.id,
                    token
                };

                UserController.updateSession(params, cb);
            }
        }
    }

    UserController.login(params, cb);
});

routes.post('/user', (req, res) => {
    // Hash password
    const secret = 'abcdefg';
    const pw_hash = crypto.createHmac('sha256', secret)
                       .update(req.body.password)
                       .digest('hex');


    // Create session token
    const currentTime = new Date();
    const token = crypto.createHmac('sha256', secret)
                       .update(currentTime.toUTCString())
                       .digest('hex');


    let params = {
        'username': req.body.username,
        'pw_hash': pw_hash,
        'email': req.body.email,
        'session_token': token // need to generate tokens
    };


    let cb = (user, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user.responseBody);
        }
    }

    UserController.createUser(params, cb);
});


routes.get('/user', (req, res) => {
    let cb = (user, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user.responseBody);
        }
    }

    UserController.getUser(req.body, cb);
});

module.exports = routes;
