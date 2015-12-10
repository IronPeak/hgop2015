var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('GameDraw:', function(){
    var given, when, then;

    it('Game can end in a draw',function(){
        given=[{
            gid: "1",
            name:"game",
	    event: "GameCreated",
            user : "player1"
        },{
	    gid: "1",
            name:"game",
	    event: "GameJoined",
	    user: "player2"
	},{
	    gid: "1",
	    name: "game",
	    x: 0,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    user: "player1"
	},{
	    gid: "1",
	    name: "game",
	    x: 1,
	    y: 0,
	    side: 'O',
            event: "MoveMade",
	    user: "player2"
	},{
	    gid: "1",
	    name: "game",
	    x: 2,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    user: "player1"
	},{
	    gid: "1",
	    name: "game",
	    x: 0,
	    y: 1,
	    side: 'O',
            event: "MoveMade",
	    user: "player2"
	},{
	    gid: "1",
	    name: "game",
	    x: 1,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    user: "player1"
	},{
	    gid: "1",
	    name: "game",
	    x: 0,
	    y: 2,
	    side: 'O',
            event: "MoveMade",
	    user: "player2"
	},{
	    gid: "1",
	    name: "game",
	    x: 2,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    user: "player1"
	},{
	    gid: "1",
	    name: "game",
	    x: 2,
	    y: 2,
	    side: 'O',
            event: "MoveMade",
	    user: "player2"
	}];
        when={
	    command: "MakeMove",
	    gid: "1",
	    name: "game",
	    x: 1,
	    y: 2,
	    user: "player1"
	};
        then=[{
            gid: "1",
            name:"game",
	    x: 1,
	    y: 2,
	    side: 'X',
            event:"GameOver",
            user: "player1",
	    winner: undefined
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
