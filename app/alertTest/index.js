'use strict';

var http = require('http');
var Client = require('node-rest-client').Client;
var _ = require('lodash');


exports.alertTest = function (req, resp) {	
	http.get('http://10.99.3.53:7070/api/v1/teams/boards/1/queues/1/cards/1', function (res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			resp.setHeader("Content-Type", "text/plain");
			resp.send(alert("a", 0, 1, 0));	
		});
	});
}

function alert(card, integrationTestsFixed, integrationTests, unitTests) {
	var res = "";

	if(integrationTestsFixed < 1) res += "Integration Tests Fixed not found! ";
	if(integrationTests < 1) res += "Integration Tests not found! ";
	if(unitTests < 1) res += "Unit Tests not found! ";

	if(res.length > 0) return "Card: " + card + ". " + res;
	return res;
}