const path = require('path');
const express = require('express');
const request = require('supertest');

const autoroute = require('../');

let app;
let server;

describe('Custom Routes folder loading', () => {
  before(() => {
    app = express();

    autoroute(app, {
      throwErrors: true,
      routesDir: path.join(process.cwd(), 'test', 'routes'),
    });

    server = app.listen(4000);
  });
  after((done) => {
    app = null;
    server.close(done);
  });
  describe('test.js', () => {
    it('should return "get" from /getTest', (done) => {
      request(app).get('/getTest').expect(200).expect('get test/routes')
        .end(done);
    });
    it('should return "post" from /postTest', (done) => {
      request(app).post('/postTest').expect(200).expect('post test/routes')
        .end(done);
    });

    // parametrised tests
    it('should return "378" from /getTest/378', (done) => {
      request(app).get('/getTest/378').expect(200).expect('378 test/routes')
        .end(done);
    });
    it('should return "3874" from /postTest/3874', (done) => {
      request(app).post('/postTest/3874').expect(200).expect('3874 test/routes')
        .end(done);
    });
    it('should return "752" from /deleteTest/752', (done) => {
      request(app).del('/deleteTest/752').expect(200).expect('752 test/routes')
        .end(done);
    });
  });
});
