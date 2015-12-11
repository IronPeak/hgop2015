var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
    var gameState = {
	gid: undefined,
	move: 0,
	name: undefined,
	eventcount: events.length,
	playerX: undefined,
	playerO: undefined,
        board: [['','',''],['','',''],['','','']],
	gameover: false,
	winner: undefined
    };

    var setGameState = {
	"GameCreated": function(event) {
	    gameState.gid = event.gid;
	    gameState.name = event.name;
	    gameState.playerX = event.user;
	},
	"GameJoined": function(event) {
	    gameState.playerO = event.user;
	},
	"MoveMade": function(event) {
	    gameState.board[event.x][event.y] = event.side;
	    gameState.move++;
	},
	"GameOver": function(event) {
	    gameState.gameover = true;
	    gameState.winner = event.winner;
	    gameState.board[event.x][event.y] = event.side;
	    gameState.move++;
	}
    };
	
    _.each(events, function(event) {
	if(setGameState[event.event]) {
	    setGameState[event.event](event);
	}
    });

    function isWinner(side) {
	if(gameState.move < 5) {
	    return false;	
	}
	var x, y, i;
	for(x = 0; x < 3; x++) {
            for(y = 0; y < 3; y++) {
		if(gameState.board[x][y] !== side) {
		    break;
		}
		if(y === 2) {
		    return true;
		}
	    }
	}
	for(y = 0; y < 3; y++) {
            for(x = 0; x < 3; x++) {
		if(gameState.board[x][y] !== side) {
		    break;
		}
		if(x === 2) {
		    return true;
		}
	    }
	}
	for(i = 0; i < 3; i++) {
	    if(gameState.board[i][i] !== side) {
		break;
	    }
	    if(i === 2) {
		return true;
	    }
	}
	for(i = 0; i < 3; i++) {
	    if(gameState.board[2-i][i] !== side) {
		break;
	    }
	    if(i === 2) {
		return true;
	    }
	}
	return false;
    }

    function isGameOver() {
	return (gameState.move > 8 || gameState.winnder !== undefined);
    }

    var commands = {
	"CreateGame": function(cmd) {
	    {
		if(cmd.gid === undefined) {
		    throw new Error("CreateGame: gid is undefined");		
		}
		if(cmd.name === undefined) {
		    throw new Error("CreateGame: name is undefined");		
		}
		if(cmd.user === undefined) {
		    throw new Error("CreateGame: user name is undefined"); 		
		}
		if(gameState.eventcount !== 0) {
		    throw new Error("CreateGame: should always be the first command");		
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
                    event: "GameCreated",
		    user: cmd.user
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
		if(cmd.user === undefined) {
		    throw new Error("JoinGame: user name is undefined"); 		
		}
		if(gameState.playerX === cmd.user) {
		    throw new Error("JoinGame: playerX and playerO can't have the same name");		
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
		    event: "GameJoined",
		    user: cmd.user
		}];
	    }	
	},
	"MakeMove": function(cmd) {
	    {
		if(cmd.gid !== gameState.gid) {
		    throw new Error("MakeMove: gids did not match");		
		}
		if(cmd.name !== gameState.name) {
		    throw new Error("MakeMove: names did not match");		
		}
		if(cmd.user !== gameState.playerX && cmd.user !== gameState.playerO) {
		    throw new Error("MakeMove: this user is not a player in the game");		
		}
		if(gameState.playerO === undefined) {
		    throw new Error("MakeMove: playerO missing");		
		}
		if(gameState.playerX === undefined) {
		    throw new Error("MakeMove: playerX missing");		
		}
		if(gameState.gameOver === true) {
		    throw new Error("MakeMove: the game is over");
		}
		if(gameState.move % 2 === 0) {
		    cmd.side = 'X';	
		    if(cmd.user !== gameState.playerX) {
			throw new Error("MakeMove: It is not your turn");
		    }
		}
		if(gameState.move % 2 === 1) {
		    cmd.side = 'O';	
		    if(cmd.user !== gameState.playerO) {
			throw new Error("MakeMove: It is not your turn");
		    }
		}
		if(cmd.x < 0 || 2 < cmd.x || cmd.y < 0 || 2 < cmd.y) {
		    throw new Error("MakeMove: not a valid board position");
		}
		if(gameState.board[cmd.x][cmd.y] !== '') {
		    throw new Error("MakeMove: board position already taken");
		}
		gameState.board[cmd.x][cmd.y] = cmd.side;
		gameState.move++;
		if(isWinner(cmd.side)) {
		    return [{
		        gid: cmd.gid,
		        name: cmd.name,
		        x: cmd.x,
		        y: cmd.y,
		        side: cmd.side,
                        event: "GameOver",
		        user: cmd.user,
			winner: cmd.user
		    }];
		}
		if(isGameOver()) {
		    return [{
		        gid: cmd.gid,
		        name: cmd.name,
		        x: cmd.x,
		        y: cmd.y,
		        side: cmd.side,
                        event: "GameOver",
		        user: cmd.user,
			winner: undefined
		    }];
		}
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
		    x: cmd.x,
		    y: cmd.y,
		    side: cmd.side,
                    event: "MoveMade",
		    user: cmd.user
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
