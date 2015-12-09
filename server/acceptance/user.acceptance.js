'use strict';

module.exports = function user(username) {
    var api = {
	cmd: {},
	name: username,
        createGame: function(gid) {
            this.cmd.gid = gid;
	    this.cmd.name = undefined;
	    this.cmd.command = "CreateGame";
	    this.cmd.playerX = username;
            return api;
	},
	joinGame: function(gid) {
	    this.cmd.gid = gid;
	    this.cmd.name = undefined;
	    this.cmd.command = "JoinGame";
	    this.cmd.playerO = username;
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
	}
    };
    return api;
};
