var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
    var gameState = {
        gid: undefined,
        move: 0,
        name: undefined,
        eventcount: 0,
        playerX: undefined,
        playerO: undefined,
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        gameover: false,
        winner: undefined
    };

    var setGameState = {
        "GameCreated": function(event) {
            gameState.gid = event.gid;
            gameState.name = event.name;
            gameState.playerX = event.user;
            gameState.eventcount++;
        },
        "GameJoined": function(event) {
            gameState.playerO = event.user;
            gameState.eventcount++;
        },
        "MoveMade": function(event) {
            gameState.board[event.x][event.y] = event.side;
            gameState.move++;
            gameState.eventcount++;
        },
        "GameOver": function(event) {
            gameState.gameover = true;
            gameState.winner = event.winner;
            gameState.board[event.x][event.y] = event.side;
            gameState.move++;
            gameState.eventcount++;
        },
        "GameDraw": function(event) {
            gameState.gameover = true;
            gameState.winner = undefined;
            gameState.board[event.x][event.y] = event.side;
            gameState.move++;
            gameState.eventcount++;
        }
    };

    _.each(events, function(event) {
        if (setGameState[event.event]) {
            setGameState[event.event](event);
        }
    });

    function isWinner(side) {
        for (var i = 0; i < 3; i++) {
            if (gameState.board[i][0] === side && gameState.board[i][1] === side && gameState.board[i][2] === side) {
                return true;
            }
            if (gameState.board[0][i] === side && gameState.board[1][i] === side && gameState.board[2][i] === side) {
                return true;
            }
        }
        if (gameState.board[1][1] === side) {
            if (gameState.board[0][0] === side && gameState.board[2][2] === side) {
                return true;
            }
            if (gameState.board[2][0] === side && gameState.board[0][2] === side) {
                return true;
            }
        }
        return false;
    }

    function isFull() {
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                if (gameState.board[x][y] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    var commands = {
        "CreateGame": function(cmd) {
            {
                if (gameState.eventcount !== 0 ||
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
                if (gameState.playerX === undefined ||
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
                if (cmd.name === undefined ||
                    cmd.user === undefined ||
                    cmd.gid === undefined ||
                    cmd.side === undefined ||
		    cmd.playerO === undefined) {
                    return [{
                        gid: cmd.gid,
                        name: cmd.name,
                        event: "IllegalAction",
                        user: cmd.user
                    }];
                }
                if (gameState.board[cmd.x][cmd.y] !== '') {
                    return [{
                        gid: cmd.gid,
                        name: cmd.name,
                        event: "IllegalMove",
                        user: cmd.user
                    }];
                }
                gameState.board[cmd.x][cmd.y] = cmd.side;
                if (isWinner(cmd.side)) {
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
                if (isFull() === true) {
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
