'use strict';

var _ = require('lodash');
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

module.exports = function given(user) {

    var properties = {
        gid: undefined,
        name: undefined,
        playerX: undefined,
        playerO: undefined
    };

    var expectations = {
	event: undefined
    };

    var cmdwrap = [];

    var gameApi = {
        "CreateGame": function(user) {
            properties.gid = user.cmd.gid;
	    if(user.cmd.name !== undefined) {
	        properties.name = user.cmd.name;
	    } else {
	        properties.name = "TestGame";
		user.cmd.name = "TestGame";
	    }
            properties.playerX = user.cmd.playerX;
            cmdwrap.push({
		dest: "/api/createGame",
		cmd: user.cmd
	    });
	}
    };

    function matchExpectations(result) {
        if(expectations !== undefined) {
	    should(expectations.event).eql(result.event);
	}
    };

    var api = {
        and: function(user) {
	    var comm = this.gameApi[user.cmd.command];
    	    if(comm === undefined) {
		throw new Error("command: " + user.cmd.command + " is undefined" + ", complete argument: " + JSON.stringify(user));
    	    }
	    comm(user);
	    return api;
	},
	expect: function(event) {
	    expectations.event = event;
            return api;
	},
	isOk: function(done) {
	    var req = request(acceptanceUrl);

	    _.each(cmdwrap, function(w) {
		req.post(w.dest).type('json').send(w.cmd)
		.end(function(err, res) {
		    if(err) return done(err);
		});
	    });

            req
            .get('/api/gameHistory/' + properties.gid)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
		matchExpectations(res.body[res.body.length - 1]);
                done();
            });
	}
    };

    var comm = gameApi[user.cmd.command];
    if(comm === undefined) {
	throw new Error("Not a valid command option " + cmd.command + ", complete argument: " + JSON.stringify(user.cmd.command));
    }
    comm(user);
    return api;

};
