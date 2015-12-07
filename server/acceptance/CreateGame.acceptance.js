'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;


describe('CreateGame acceptance test:', function () {

  it('should create a game', function (done) {

    var command = {
      command:"CreateGame",
      gid:"123",
      name:"What a game",
      playerX: "IronPeak"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/123')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "gid": "123",
		"name": "What a game",
                "event": "GameCreated",
                "playerX": "IronPeak"
              }]);
            done();
          });
      });
  });
});
