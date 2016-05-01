var express = require('express');
var connect = require('connect');
var app = express();
var port = process.env.PORT || 8080;
var socket = require('socket.io');

// config
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//  Routers
require('./app/routes')(app);
var server = app.listen(port);
var io = socket.listen(server);
require('./app/socketIO')(io);
console.log('The App runs on port ' + port);
