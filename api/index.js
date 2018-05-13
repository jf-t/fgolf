var express = require('express')
var app = express()
var routes = require('./routes/all');

app.use('/', routes);

app.listen(3000);
