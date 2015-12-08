'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

module.exports = function given(cmdName) {

        var cmd = {
	    command: cmdName,
            destination: undefined
        };

        var expectations = [];

        var givenApi = {

            sendTo: function(dest) {
                cmd.destination = dest;
                return givenApi;
            },

            expect: function(eventName){
                expectations.push(eventName);
                return givenApi;
            },

            and: function(eventName){
                expectations.push(eventName);
                return givenApi;
            },

            when: function(done) {
                var req = request(acceptanceUrl);
    		req
      		.post(cmd.destination)
      		.type('json')
      		.send(cmd.command)
      		.end(function(err, res) {
        	    if (err) return done(err);
        	    request(acceptanceUrl)
          	    .get('/api/gameHistory/' + cmd.command.gid)
          	    .expect(200)
          	    .expect('Content-Type', /json/)
          	    .end(function (err, res) {
            	        if (err) return done(err);
            	        res.body.should.be.instanceof(Array);
            	        should(res.body).eql(expectations);
            	        done();
          	    });
      		});
            }
        };
        return givenApi;

};
