'use strict';

const express = require('express');
const request = require('supertest');

const autoroute = require('../');

let app;
let server;

describe('Normal Routes folder loading', () => {
  before(() => {
    app = express();

    autoroute(app, {
      throwErrors: true,
    });

    server = app.listen(4000);
  });
  after((done) => {
    app = null;
    server.close(done);
  });
  describe('test.js', () => {
    it('should return "get" from /getTest', (done) => {
      request(app).get('/getTest').expect(200).expect('get').end(done);
    });
    it('should return "post" from /postTest', (done) => {
      request(app).post('/postTest').expect(200).expect('post').end(done);
    });

		// parametrised tests
    it('should return "125" from /getTest/125', (done) => {
      request(app).get('/getTest/125').expect(200).expect('125').end(done);
    });
    it('should return "8137" from /postTest/8137', (done) => {
      request(app).post('/postTest/8137').expect(200).expect('8137').end(done);
    });
    it('should return "134" from /deleteTest/134', (done) => {
      request(app).del('/deleteTest/134').expect(200).expect('134').end(done);
    });
  });
  describe('api/test.js', () => {
    it('should return "get" from /api/getTest', (done) => {
      request(app).get('/api/getTest').expect(200).expect('api/get').end(done);
    });
    it('should return "post" from /api/postTest', (done) => {
      request(app).post('/api/postTest').expect(200).expect('api/post').end(done);
    });

		// parametrised tests
    it('should return "125" from /api/getTest/125', (done) => {
      request(app).get('/api/getTest/125').expect(200).expect('125').end(done);
    });
    it('should return "8137" from /api/postTest/8137', (done) => {
      request(app).post('/api/postTest/8137').expect(200).expect('8137').end(done);
    });
    it('should return "134" from /api/deleteTest/134', (done) => {
      request(app).del('/api/deleteTest/134').expect(200).expect('134').end(done);
    });
  });
  describe('api/2/test.js', () => {
    it('should return "get" from /api/2/getTest', (done) => {
      request(app).get('/api/2/getTest').expect(200).expect('api/2/get').end(done);
    });
    it('should return "post" from /api/2/postTest', (done) => {
      request(app).post('/api/2/postTest').expect(200).expect('api/2/post').end(done);
    });

		// parametrised tests
    it('should return "125" from /api/2/getTest/125', (done) => {
      request(app).get('/api/2/getTest/125').expect(200).expect('125').end(done);
    });
    it('should return "8137" from /api/2/postTest/8137', (done) => {
      request(app).post('/api/2/postTest/8137').expect(200).expect('8137').end(done);
    });
    it('should return "134" from /api/2/deleteTest/134', (done) => {
      request(app).del('/api/2/deleteTest/134').expect(200).expect('134').end(done);
    });
  });
});
