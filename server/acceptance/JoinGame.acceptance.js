'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;


describe('JoinGame acceptance test:', function () {

    it('should join a game', function (done) {

        var command = [{
            command: "CreateGame",
            gid: "1337",
            name: "Game1337",
            playerX: "IronPeak"
        },{
            command: "JoinGame",
            gid: "1337",
            name: "Game1337",
            playerO: "IronBeak"
        }];

        var req = request(acceptanceUrl);
        req
            .post('/api/createGame')
            .type('json')
            .send(command[0])
            .end(function(err, res) {
                if (err) return done(err);
                request(acceptanceUrl)
                .get('/api/gameHistory/1337')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    should(res.body).eql(
                    [{
                        "gid": "1337",
		        "name": "Game1337",
                        "event": "GameCreated",
                        "playerX": "IronPeak"
                    }]);
                done();
            });
        });

        req
            .post('/api/joinGame')
            .type('json')
            .send(command[1])
            .end(function(err, res) {
                if (err) return done(err);
                request(acceptanceUrl)
                .get('/api/gameHistory/1337')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    should(res.body).eql(
                    [{
                        "gid": "1337",
		        "name": "Game1337",
                        "event": "GameCreated",
                        "playerX": "IronPeak"
                    },{
                        "gid": "1337",
		        "name": "Game1337",
                        "event": "GameJoined",
			"PlayerX": "IronPeak",
                        "playerO": "IronBeak"
                    }]);
                done();
            });
        });
    });
});