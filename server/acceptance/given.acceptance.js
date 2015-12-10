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
	expectingevent: false,
	event: undefined,

	expectingplayerx: false,
	playerx: undefined,

	expectingplayero: false,
	playero: undefined
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
	},
        "JoinGame": function(user) {
            properties.playerO = user.cmd.playerO;
	    if(user.cmd.name === undefined) {
            	user.cmd.name = properties.name
	    }
            cmdwrap.push({
		dest: "/api/joinGame",
		cmd: user.cmd
            });
	},
	"MakeMove": function(user) {
	    user.cmd.gid = properties.gid;
	    user.cmd.name = properties.name;
	    if(user.name === properties.playerX) {
		user.cmd.playerX = properties.playerX;
		user.cmd.command = "MakeMoveX";
	    } else {
		user.cmd.playerO = properties.playerO;
		user.cmd.command = "MakeMoveO";
	    }
	    cmdwrap.push({
		dest: "/api/makeMove",
		cmd: user.cmd
            });
	}
    };

    function matchExpectations(result) {
        if(expectations.expectingevent === true) {
	    should(expectations.event).eql(result.event);
	}
	if(expectations.expectingplayerx === true) {
	    should(expectations.playerx).eql(result.playerX);
	}
	if(expectations.expectingplayero === true) {
	    should(expectations.playero).eql(result.playerO);
	}
    };

    var api = {
        and: function(user) {
	    var comm = gameApi[user.cmd.command];
    	    if(comm === undefined) {
		throw new Error("Not a valid command option " + cmd.command + ", complete argument: " + JSON.stringify(user.cmd.command));
    	    }
    	    comm(user);
	    return api;
	},
	expectEvent: function(event) {
	    expectations.expectingevent = true;
	    expectations.event = event;
            return api;
	},
	byPlayerX: function(username) {
	    expectations.expectingplayerx = true;
	    expectations.playerx = username;
	    return api;
	},
	byPlayerO: function(username) {
	    expectations.expectingplayero = true;
	    expectations.playero = username;
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
