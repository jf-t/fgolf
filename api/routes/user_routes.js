const routes = require('express').Router();

const UserController = require('../controllers/user_controller');


routes.post('/auth', (req, res) => {
    let authResponse = UserController.login(req.body);

    if (authResponse.status === 200) {
        // successful auth
        res.status(200).json(authResponse.userObject);
    } else {
        res.status(500).json({ "error": "500 - Server Error (Auth)" });
    }
});

routes.post('/user', (req, res) => {
    let user = UserController.createUser(req.body);

    if (user) {
        res.status(200).json(user.responseBody);
    } else {
        res.status(500).json({ "error": "500 - Server Error (Create User)" });
    }
});

module.exports = routes;
