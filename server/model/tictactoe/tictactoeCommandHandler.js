var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    var gameState = {
	move: 0,
        board: [['','',''],['','',''],['','','']]
    };

    var setGameState = {
	"MoveMade": function(event) {
	    gameState.board[event.x][event.y] = event.side;
	    gameState.move++;
	}
    };
	
    _.each(events, function(event) {
	var e = setGameState[event.event];
	if(e !== undefined) {
	    setGameState(e);
	}
    });

    var commands = {
	"CreateGame": function(cmd) {
	    {
		if(cmd.id === undefined) {
		    throw new Error("CreateGame: game id is undefined");		
		}
		if(cmd.gid === undefined) {
		    throw new Error("CreateGame: game gid is undefined");		
		}
		if(cmd.name === undefined) {
		    throw new Error("CreateGame: game name is undefined");		
		}
		if(cmd.playerX === undefined) {
		    throw new Error("CreateGame: player name is undefined"); 		
		}
		if(gameState.move !== 0) {
		    throw new Error("CreateGame: game is already in progress");
		}
		return [{
		    id: cmd.id,
		    gid: cmd.gid,
		    name: cmd.name,
                    event: "GameCreated",
		    playerX: cmd.playerX
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
