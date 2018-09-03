const routes = require('express').Router();
const crypto = require('crypto');

const user = require('../controllers/user_controller');


routes.post('/user', user.getUserCreds, user.createUser, user.updateSession, (req, res) => {
    if (req.user) {
        res.status(200).json(req.user.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue'});
    }
});


routes.post('/auth', user.getUserCreds, user.login, user.updateSession, (req, res) => {
    if (req.user) {
        res.status(200).json(req.user.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue'});
    }
});


// route needs to be changed to have ID
routes.get('/user/:id', user.getById, (req, res) => {
    if (req.user) {
        res.status(200).json(req.user.responseBody);
    } else {
        res.status(500).json({'error': 'Unregistered issue'});
    }
});

module.exports = routes;
