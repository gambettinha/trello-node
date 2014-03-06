'use strict';

var http = require('http');
var Client = require('node-rest-client').Client;
var _ = require('lodash');


exports.teste = function (req, resp) {	
	resp.send('hello lead time');
}

exports.boards = function (req, resp) {	
	resp.send('hello lead time');
}

exports.startingQueues = function (req, resp) {	
	resp.send('hello lead time');
}

exports.endingQueues = function (req, resp) {	
	resp.send('hello lead time');
}

exports.leadTime = function (req, resp) {	
	resp.send('hello lead time');
}