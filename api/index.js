var express = require('express')
var app = express()

var bodyParser = require('body-parser');


var routes = require('./routes/all');



app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, sessionToken");
    next();
});



app.use('/', routes);

app.listen(3000);
