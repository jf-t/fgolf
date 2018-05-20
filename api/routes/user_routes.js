const routes = require('express').Router();
const crypto = require('crypto');

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
    const secret = 'abcdefg';
    const pw_hash = crypto.createHmac('sha256', secret)
                       .update(req.body.password)
                       .digest('hex');


    const currentTime = new Date();
    const token = crypto.createHmac('sha256', secret)
                       .update(currentTime.toUTCString())
                       .digest('hex');


    let params = {
        'username': res.username,
        'pw_hash': pw_hash,
        'email': res.email,
        'session_token': token // need to generate tokens
    };

    let response = UserController.createUser(req.body);

    // user.subscribe(res => {
    //     console.log(res);
    //     debugger;
    // });
    // if (user) {
    //     res.status(200).json(user.responseBody);
    // } else {
    //     res.status(500).json({ "error": "500 - Server Error (Create User)" });
    // }

    // res.status(200).json(response);
});


routes.get('/user', (req, res) => {
    let user = UserController.getUser(req.body);
});

module.exports = routes;
