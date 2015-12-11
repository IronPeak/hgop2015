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
		if(gameState.eventcount !== 0 ||
		   cmd.name === undefined ||
		   cmd.user === undefined ||
		   cmd.gid === undefined) {
		    return [{
		    	gid: cmd.gid,
		    	name: cmd.name,
                    	event: "IllegalAction",
		    	user: cmd.user
		    }];
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
		if(cmd.user === gameState.playerX ||
		   cmd.name !== gameState.name ||
		   gameState.eventcount !== 1 ||
		   cmd.name === undefined ||
		   cmd.user === undefined ||
		   cmd.gid === undefined) {
		    return [{
		    	gid: cmd.gid,
		    	name: cmd.name,
                    	event: "IllegalAction",
		    	user: cmd.user
		    }];
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
		if(cmd.name !== gameState.name ||
		   gameState.eventcount < 2 ||
		   cmd.name === undefined ||
		   cmd.user === undefined ||
		   cmd.gid === undefined) {
		    return [{
		    	gid: cmd.gid,
		    	name: cmd.name,
                    	event: "IllegalAction",
		    	user: cmd.user
		    }];
		}
		if(gameState.board[cmd.x][cmd.y] !== '' ||
		  (gameState.playerX !== cmd.user &&
		   gameState.playerO !== cmd.user)) {
		    return [{
		    	gid: cmd.gid,
		    	name: cmd.name,
                    	event: "IllegalMove",
		    	user: cmd.user
		    }];
		}
		if(cmd.user === gameState.playerX) {
		    cmd.side = 'X';
		} else {
		    cmd.side = 'O';
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
	    return commands[cmd.command](cmd);
	}
    };
};
