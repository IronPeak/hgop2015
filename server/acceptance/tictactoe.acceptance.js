'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('TEST ENV GET /api/gameHistory', function() {

    it('Should have ACCEPTANCE_URL environment variable exported.', function() {
        /*jshint -W030 */
        acceptanceUrl.should.be.ok;
    });

    it('should execute same test using old style', function(done) {

        var command = {
            command: "CreateGame",
            gid: "9",
            name: "TestGameName",
            user: "TestPlayer"
        };

        var req = request(acceptanceUrl);
        req
            .post('/api/createGame')
            .type('json')
            .send(command)
            .end(function(err, res) {
                if (err) return done(err);
                request(acceptanceUrl)
                    .get('/api/gameHistory/9')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err) return done(err);
                        res.body.should.be.instanceof(Array);
                        should(res.body).eql(
                            [{
                                "gid": "9",
                                "name": "TestGameName",
                                "event": "GameCreated",
                                "user": "TestPlayer"
                            }]);
                        done();
                    });
            });
    });

    it('Should execute fluid API test', function(done) {
        given(user("HrafnOrri").createGame("brabra").named("DasGame")).expectEvent("GameCreated").isOk(done);
    });
});
