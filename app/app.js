'use strict';

var express = require('express');
var app = express();
var service = require('./service');
var alertTest = require('./alertTest');
var routes = require('./routes');
var leadTime = require('./service/leadTime');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
}).configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}).configure('production', function(){
  app.use(express.errorHandler());
});

app.use(express.bodyParser());

// Routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/new_call', service.new_call);
app.get('/callAllBords', service.callAllBords);
app.get('/raw_api_call', service.rawApiCall);
app.get('/simpler_api_call', service.simplerApiCall);
app.get('/project/:pIndex', service.projectByIndex);
app.get('/leadTime', leadTime.teste);
app.get('/alert_test', alertTest.alertTest);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.listen(3000);
console.log('Listening on port 3000');

