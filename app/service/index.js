'use strict';

var http = require('http');
var Client = require('node-rest-client').Client;
var _ = require('lodash');


exports.new_call = function (req, resp) {	
	http.get('http://10.99.2.175:7070/api/v1/teams/boards/1/queues/1/cards/1', function (res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			resp.setHeader("Content-Type", "text/plain");
			var result = JSON.parse(data);

			var text = 'integration Tests Fixed = '+result.testInfo.integrationTestsFixed + '\n' ;
			text += 'integration Tests = '+result.testInfo.integrationTests  + '\n' ; 
			text += 'unit Tests = '  +result.testInfo.unitTests  ; 

			var fixed = result.testInfo.integrationTestsFixed;
			var integration = result.testInfo.integrationTests;
			var unit = result.testInfo.unitTests;

			resp.send(text);	
		});
	});

exports.rawApiCall = function (req, resp) {	
	http.get('http://www.mocky.io/v2/52f3766070d88c4f01c9111b', function (res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			resp.setHeader("Content-Type", "text/plain");
			resp.send(parseResponse('=== RAW API CALL ===', JSON.parse(data)));	
		});
	});
}

exports.simplerApiCall = function (req, resp) {	
	var client = new Client();
	simpleApiCall(function (data) {
		resp.setHeader("Content-Type", "text/plain");
		resp.send(parseResponse('=== SIMPLER API CALL ===', data));	
	});
}

exports.projectByIndex = function (req, resp) {
	var client = new Client();

	simpleApiCall(function (data) {
		resp.setHeader("Content-Type", "text/plain");
		resp.send(parseProject(data.projects[req.params.pIndex]));
	});
}

function simpleApiCall(cb) {
	var client = new Client();
	client.get('http://www.mocky.io/v2/52f3766070d88c4f01c9111b', function (data, response) {
		cb(JSON.parse(data));
	});
}

function parseResponse(header, data) {
	console.log('Data:', data);
	var projectsCount = data.projects.length;
	var text = header + '\n';
	text += 'There are ' + projectsCount + ' projects. They are:\n'
	_.forEach(data.projects, function (project) { 
		text += parseProject(project);
	});
	return text;
}

function parseProject(project) {
	if (!project) return 'No project found!';
	var text = '> ' + project.name + ' with ' + project.developers + ' developers.\n';
	text += '  Project platforms are: [' + project.platform + ']\n';
	return text;
}