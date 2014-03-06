'use strict';

var express = require('express');
var app = express();
var service = require('./service');

app.use(express.bodyParser());

app.get('/hello.txt', function(req, res) {
  res.send('Hello World');
});

app.get('/new_call', service.new_call);
app.get('/raw_api_call', service.rawApiCall);
app.get('/simpler_api_call', service.simplerApiCall);
app.get('/project/:pIndex', service.projectByIndex);

app.listen(3000);
console.log('Listening on port 3000');