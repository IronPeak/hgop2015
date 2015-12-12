'use strict';

var _ = require('lodash');
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(user) {

    var properties = {
        gid: undefined,
        name: undefined,
        playerX: undefined,
        playerO: undefined
    };

    var expectations = {
	expectingevent: false,
	event: undefined,

	expectinguser: false,
	user: undefined,
	
	expectingwinner: false,
	winner: undefined,

	expectingpos: false,
	x: undefined,
	y: undefined,

	expectingside: false,
	side: undefined
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
            properties.playerX = user.cmd.user;
            cmdwrap.push({
		dest: "/api/createGame",
		cmd: user.cmd
	    });
	},
        "JoinGame": function(user) {
            properties.playerO = user.cmd.user;
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
		user.cmd.user = properties.playerX;
		user.cmd.command = "MakeMove";
	    } 
	    if(user.name === properties.playerO) {
		user.cmd.user = properties.playerO;
		user.cmd.command = "MakeMove";
	    }
	    cmdwrap.push({
		dest: "/api/makeMove",
		cmd: user.cmd
            });
	}
    };

    function matchExpectations(result) {
        if(expectations.expectingevent === true) {
	    should(result.event).eql(expectations.event);
	}
	if(expectations.expectinguser === true) {
	    should(result.user).eql(expectations.user);
	}
	if(expectations.expectingwinner === true) {
	    should(result.winner).eql(expectations.winner);
	}
	if(expectations.expectingpos === true) {
	    should(result.x).eql(expectations.x);
	    should(result.y).eql(expectations.y);
	}
	if(expectations.expectingside === true) {
	    should(result.side).eql(expectations.side);
	}
    }

    var api = {
        and: function(user) {
	    var comm = gameApi[user.cmd.command];
    	    if(comm === undefined) {
		throw new Error("Not a valid command option " + user.cmd.command + ", complete argument: " + JSON.stringify(user.cmd.command));
    	    }
    	    comm(user);
	    return api;
	},
	expectEvent: function(event) {
	    expectations.expectingevent = true;
	    expectations.event = event;
            return api;
	},
	byUser: function(username) {
	    expectations.expectinguser = true;
	    expectations.user = username;
	    return api;
	},
	withWinner: function(winner) {
	    expectations.expectingwinner = true;
	    expectations.winner = winner;
	    return api;	
	},
	atPosition: function(x, y) {
	    expectations.expectingpos = true;
	    expectations.x = x;
	    expectations.y = y;
	    return api;
	},
	as: function(side) {
	    expectations.expectingside = true;
	    expectations.side = side;
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

            request(acceptanceUrl)
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

    gameApi[user.cmd.command](user);
    return api;

}

function user(username) {
    var api = {
	cmd: {},
	name: username,
        createGame: function(gid) {
            this.cmd.gid = gid;
	    this.cmd.name = undefined;
	    this.cmd.command = "CreateGame";
	    this.cmd.user = username;
            return api;
	},
	joinGame: function(gid) {
	    this.cmd.gid = gid;
	    this.cmd.name = undefined;
	    this.cmd.command = "JoinGame";
	    this.cmd.user = username;
	    return api;
	},
	named: function(name) {
	    this.cmd.name = name;
	    return api;
	},
	makeMove: function(x, y) {
	    this.cmd.gid = undefined;
	    this.cmd.name = undefined;
	    this.cmd.command = "MakeMove";
	    this.cmd.x = x;
	    this.cmd.y = y;
	    return api;
	},
	as: function(side) {
	    this.cmd.side = side;
	    return api;
	}
    };
    return api;
}

module.exports.given = given;
module.exports.user = user;
