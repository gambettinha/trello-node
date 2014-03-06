'use strict';

var http = require('http');
var Client = require('node-rest-client').Client;
var _ = require('lodash');
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "valeilegra@gmail.com",
        pass: "ilegra2014"
    }
});

function mailOptions(msg){
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: "Trello Ilegra ✔ <valeilegra@gmail.com>", // sender address
	    to: "salerno.rafael@gmail.com", // list of receivers
	    subject: "Trello ✔", // Subject line
	    text: "Trello Hello world ✔", // plaintext body
	    html: msg // html body
	}
	return mailOptions
}


exports.new_call = function (req, resp) {	
	http.get('http://10.99.2.175:7070/api/v1/teams/boards/1/queues/1/cards/1', function (res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			resp.setHeader("Content-Type", "text/plain");
			var result = JSON.parse(data);

			var fixed = result.testInfo.integrationTestsFixed;
			var integration = result.testInfo.integrationTests;
			var unit = result.testInfo.unitTests;


			resp.send(alert('test',fixed,integration,unit));	
		});
	});
}


function alert(card, integrationTestsFixed, integrationTests, unitTests) {
	var res = "";

	if(integrationTestsFixed < 1) res += "Integration Tests Fixed not found! ";
	if(integrationTests < 1) res += "Integration Tests not found! ";
	if(unitTests < 1) res += "Unit Tests not found! ";

	var msg="";
	if(res.length > 0) msg=  "Card: " + card + ". " + res;

     // send mail with defined transport object
		smtpTransport.sendMail(mailOptions(msg), function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent ");
		    }

		    // if you don't want to use this transport object anymore, uncomment following line
		    //smtpTransport.close(); // shut down the connection pool, no more messages
		});

	return msg;
}

exports.callAllBords = function (req, resp) {	
	http.get('http://10.99.2.175:7070/api/v1/teams/boards', function (res) {
		res.setEncoding('utf8');
		res.on('data', function (data) {
			resp.setHeader("Content-Type", "text/plain");
			

			resp.send(data);	
		});
	});
}


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