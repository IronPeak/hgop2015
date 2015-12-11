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
	},
	"GameDraw": function(event) {
	    gameState.gameover = true;
	    gameState.winner = undefined;
	    gameState.board[event.x][event.y] = event.side;
	    gameState.move++;
	},
	"IllegalAction": function(event) {
	}
    };
	
    _.each(events, function(event) {
	if(setGameState[event.event]) {
	    setGameState[event.event](event);
	}
    });

    function isWinner(side) {
	for(var i = 0; i < 3; i++) {
	    if(gameState.board[i][0] === side && gameState.board[i][1] === side && gameState.board[i][2] === side) {
		return true;
	    }
	    if(gameState.board[0][i] === side && gameState.board[1][i] === side && gameState.board[2][i] === side) {
		return true;
	    }
	}
	if(gameState.board[1][1] === side) {
	    if(gameState.board[0][0] === side && gameState.board[2][2] === side) {
		return true;
	    }
	    if(gameState.board[2][0] === side && gameState.board[0][2] === side) {
		return true;
	    }
	}
	return false;
    }

    function isGameOver() {
	return ((gameState.move > 8) || (gameState.gameover === true));
    }

    var commands = {
	"CreateGame": function(cmd) {
	    {
		if(isGameOver() === true) {
		    throw new Error("CreateGame: game is finished");	
		}
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
		if(isGameOver() === true) {
		    throw new Error("JoinGame: game is finished");	
		}
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
		if(isGameOver() === true) {
		    throw new Error("MakeMove: game is finished");	
		}
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
		if(gameState.gameover === true) {
		    throw new Error("MakeMove: the game is over");
		}
		if((gameState.move % 2) === 0) {
		    cmd.side = 'X';	
		    if(cmd.user !== gameState.playerX) {
			throw new Error("MakeMove: It is not your turn");
		    }
		} else {
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
		if(isWinner(cmd.side) === true) {
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
		if(isGameOver() === true) {
		    return [{
		        gid: cmd.gid,
		        name: cmd.name,
		        x: cmd.x,
		        y: cmd.y,
		        side: cmd.side,
                        event: "GameDraw",
		        user: cmd.user
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
	    try {
	        return command(cmd);
	    } catch(e) {
		return [{
		    gid: cmd.gid,
		    name: cmd.name,
                    event: "IllegalAction",
		    user: cmd.user
		}];
	    }
	}
    };
};
