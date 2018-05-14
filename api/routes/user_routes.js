const routes = require('express').Router();

const UserController = require('../controllers/user_controller');


routes.post('/auth', (req, res) => {
    let authResponse = UserController.login(req.body);

    if (authResponse.status === 200) {
        res.status(200).json(authResponse.userObject);
    } else {
        res.status(500).json({ "error": "500 - Server Error (Auth)" });
    }
});

routes.post('/user', (req, res) => {
    let params = {
        'username': res.username,
        'pw_hash': 'password', // needs to be encrypted
        'email': res.email,
        'session_token': 'token' // need to generate tokens
    };

    let user = UserController.createUser(req.body);

    if (user) {
        res.status(200).json(user.responseBody);
    } else {
        res.status(500).json({ "error": "500 - Server Error (Create User)" });
    }
});


routes.get('/user', (req, res) => {
    let user = UserController.getUser(req.body);
});

module.exports = routes;
