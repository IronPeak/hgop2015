var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    var gameState = {
	gid: undefined,
	move: 0,
	name: undefined,
	eventcount: events.length,
	playerX: undefined,
	playerO: undefined,
        board: [['','',''],['','',''],['','','']]
    };

    var setGameState = {
	"GameCreated": function(event) {
	    gameState.gid = event.gid;
	    gameState.name = event.name;
	    gameState.playerX = event.playerX;
	},
	"GameJoined": function(event) {
	    gameState.playerO = event.playerO;
	},
	"MoveMade": function(event) {
	    gameState.board[event.x][event.y] = event.side;
	    gameState.move++;
	}
    };
	
    _.each(events, function(event) {
	if(setGameState[event.event]) {
	    setGameState[event.event](event);
	}
    });

    var commands = {
	"CreateGame": function(cmd) {
	    {
		if(cmd.gid === undefined) {
		    throw new Error("CreateGame: gid is undefined");		
		}
		if(cmd.name === undefined) {
		    throw new Error("CreateGame: name is undefined");		
		}
		if(cmd.playerX === undefined) {
		    throw new Error("CreateGame: playerX name is undefined"); 		
		}
		if(gameState.eventcount !== 0) {
		    throw new Error("CreateGame: should always be the first command");		
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
                    event: "GameCreated",
		    playerX: cmd.playerX
		}];
	    }
	},
	"JoinGame": function(cmd) {
	    {
		if(cmd.gid === undefined) {
		    throw new Error("JoinGame: gid is undefined");		
		}
		if(cmd.gid !== gameState.gid) {
		    throw new Error("JoinGame: game gid does not match");		
		}
		if(cmd.name !== gameState.name) {
		    throw new Error("JoinGame: game name does not match");		
		}
		if(cmd.playerO === undefined) {
		    throw new Error("JoinGame: playerO name is undefined"); 		
		}
		if(gameState.playerX === cmd.playerO) {
		    throw new Error("JoinGame: playerX and playerO can't have the same name");		
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
		    event: "GameJoined",
		    playerX: gameState.playerX,
		    playerO: cmd.playerO
		}];
	    }	
	}
    };

    return {
        execute: function(cmd) {
	    var command = commands[cmd.command];
            if(command === undefined) {
		throw new Error("Not a valid command option " + cmd.command + ", complete argument: " + JSON.stringify(cmd));
	    }
	    return command(cmd);
	}
    };
};
