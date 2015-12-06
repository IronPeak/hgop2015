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
		if(gameState.playerO !== undefined) {
		    throw new Error("JoinGame: the game is already full");		
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
	},
	"MakeMoveX": function(cmd) {
	    {
		if(cmd.gid !== gameState.gid) {
		    throw new Error("MakeMoveX: gids did not match");		
		}
		if(cmd.name !== gameState.name) {
		    throw new Error("MakeMoveX: names did not match");		
		}
		if(cmd.playerX !== gameState.playerX) {
		    throw new Error("MakeMoveX: playerX does not match");		
		}
		if(gameState.playerO === undefined) {
		    throw new Error("MakeMoveX: playerO missing");		
		}
		if(gameState.move % 2 !== 0) {
		    throw new Error("MakeMoveX: it is not your turn");		
		}
		if(cmd.x < 0 || 2 < cmd.x || cmd.y < 0 || 2 < cmd.y) {
		    throw new Error("MakeMoveX: not a valid board position");
		}
		if(gameState.board[cmd.x][cmd.y] !== '') {
		    throw new Error("MakeMoveX: board position already taken");
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
		    x: cmd.x,
		    y: cmd.y,
		    side: 'X',
                    event: "MoveMade",
		    playerX: cmd.playerX
		}];
	    }
	},
	"MakeMoveO": function(cmd) {
	    {
		if(cmd.gid !== gameState.gid) {
		    throw new Error("MakeMoveO: gids did not match");		
		}
		if(cmd.name !== gameState.name) {
		    throw new Error("MakeMoveO: names did not match");		
		}
		if(cmd.playerO !== gameState.playerO) {
		    throw new Error("MakeMoveO: playerO does not match");		
		}
		if(gameState.move % 2 !== 1) {
		    throw new Error("MakeMoveO: it is not your turn");		
		}
		if(cmd.x < 0 || 2 < cmd.x || cmd.y < 0 || 2 < cmd.y) {
		    throw new Error("MakeMoveO: not a valid board position");
		}
		if(gameState.board[cmd.x][cmd.y] !== '') {
		    throw new Error("MakeMoveO: board position already taken");
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
		    x: cmd.x,
		    y: cmd.y,
		    side: 'O',
                    event: "MoveMade",
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
