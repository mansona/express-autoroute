var autoroute = require('../');

var express = require('express');
var request = require('supertest');

var app;
var server;

describe('Custom Routes folder loading', function(){
	before(function(){
		var path = require('path');
		app = express();

		autoroute(app, {
			throwErrors: true,
			routesDir: path.join(process.cwd(), "test", "routes")
		});

		server = app.listen(255256);
	});
	after(function(done){
		app = null;
		server.close(done);
	});
	describe('test.js', function(){
		it('should return "get" from /getTest', function(done){
			request(app).get('/getTest').expect(200).expect("get test/routes").end(done);
		});
		it('should return "post" from /postTest', function(done){
			request(app).post('/postTest').expect(200).expect("post test/routes").end(done);
		});

		//parametrised tests
		it('should return "378" from /getTest/378', function(done){
			request(app).get('/getTest/378').expect(200).expect("378 test/routes").end(done);
		});
		it('should return "3874" from /postTest/3874', function(done){
			request(app).post('/postTest/3874').expect(200).expect("3874 test/routes").end(done);
		});
		it('should return "752" from /deleteTest/752', function(done){
			request(app).del('/deleteTest/752').expect(200).expect("752 test/routes").end(done);
		});
	});
});
