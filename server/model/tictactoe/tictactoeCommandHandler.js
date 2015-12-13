var _ = require('lodash');

module.exports = function tictactoeCommandHandler(events) {
    var gameState = {
        createEvent: events[0],
        board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    };

    var setGameState = {
        "MoveMade": function(event) {
            gameState.board[event.x][event.y] = event.side;
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
                if (gameState.createEvent !== undefined ||
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
                if (gameState.createEvent === undefined ||
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
                    cmd.gid === undefined) {
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
