
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var mysql = require('mysql');
//var io = require()
//var cloudinary = require('cloundinary');

var app = express();
//Add this part for socket integration 
var server = require('http').createServer(app);
console.log('----- server -----');
console.log(JSON.stringify(server));
console.log('----- io  -----');
console.log(JSON.stringify(io));
var io = require('socket.io')(server);
io.on('connection', function(){
   console.log('----io.on----');
   console.log(JSON.stringify(io));
});

var port = process.env.PORT || 3000;
var http_port = 20000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  //var mongo_link = 'mongodb://coliguanda@gmail.com:ac030_Yvr@ds021663.mlab.com:21663/nodeproject1';
  mongoose.connect(config.db, options);
  // mongoose.connect(mongo_link);
  //mongoose.connect('mongodb://thebuzzers:cs310project@ds059145.mongolab.com:59145/comicbuzzdb');
  
};
connect();
//console.log(mongoose.connection);

mongoose.connection.on('error', console.log);
console.log(connect);
mongoose.connection.on('disconnected', connect);
//console.log('@server.js   __dirname   ::  '+ __dirname);
// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);




app.listen(port);
console.log('Express app started on port ' + port);
