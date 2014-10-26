var autoroute = require('../');

var express = require('express');
var request = require('supertest');

var app;
var server;

describe('Normal Routes folder loading', function(){
	before(function(){
		app = express();

		autoroute(app, {
			throwErrors: true
		});

		server = app.listen(255255);
	});
	after(function(done){
		app = null;
        server.close(done);
	});
	describe('test.js', function(){
		it('should return "get" from /getTest', function(done){
			request(app).get('/getTest').expect(200).expect("get").end(done);
		});
		it('should return "post" from /postTest', function(done){
			request(app).post('/postTest').expect(200).expect("post").end(done);
		});

		//parametrised tests
		it('should return "125" from /getTest/125', function(done){
			request(app).get('/getTest/125').expect(200).expect("125").end(done);
		});
		it('should return "8137" from /postTest/8137', function(done){
			request(app).post('/postTest/8137').expect(200).expect("8137").end(done);
		});
		it('should return "134" from /deleteTest/134', function(done){
			request(app).del('/deleteTest/134').expect(200).expect("134").end(done);
		});
	});
	describe('api/test.js', function(){
		it('should return "get" from /api/getTest', function(done){
			request(app).get('/api/getTest').expect(200).expect("api/get").end(done);
		});
		it('should return "post" from /api/postTest', function(done){
			request(app).post('/api/postTest').expect(200).expect("api/post").end(done);
		});

		//parametrised tests
		it('should return "125" from /api/getTest/125', function(done){
			request(app).get('/api/getTest/125').expect(200).expect("125").end(done);
		});
		it('should return "8137" from /api/postTest/8137', function(done){
			request(app).post('/api/postTest/8137').expect(200).expect("8137").end(done);
		});
		it('should return "134" from /api/deleteTest/134', function(done){
			request(app).del('/api/deleteTest/134').expect(200).expect("134").end(done);
		});
	});
	describe('api/2/test.js', function(){
		it('should return "get" from /api/2/getTest', function(done){
			request(app).get('/api/2/getTest').expect(200).expect("api/2/get").end(done);
		});
		it('should return "post" from /api/2/postTest', function(done){
			request(app).post('/api/2/postTest').expect(200).expect("api/2/post").end(done);
		});

		//parametrised tests
		it('should return "125" from /api/2/getTest/125', function(done){
			request(app).get('/api/2/getTest/125').expect(200).expect("125").end(done);
		});
		it('should return "8137" from /api/2/postTest/8137', function(done){
			request(app).post('/api/2/postTest/8137').expect(200).expect("8137").end(done);
		});
		it('should return "134" from /api/2/deleteTest/134', function(done){
			request(app).del('/api/2/deleteTest/134').expect(200).expect("134").end(done);
		});
	});
});
