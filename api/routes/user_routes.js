const routes = require('express').Router();

const UserController = require('../controllers/user_controller');


routes.post('/auth', (req, res) => {
    let authResponse = UserController.login(req.body);

    if (authResponse.status === 200) {
        // successful auth
        res.status(200).json(authResponse.userObject);
    }
});

module.exports = routes;
