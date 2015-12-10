var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('Player O Wins:', function(){
    var given, when, then;

    it('Player O can win',function(){
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
	    x: 2,
	    y: 1,
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
	    x: 1,
	    y: 2,
	    side: 'X',
            event: "MoveMade",
	    user: "player1"
	}];
        when={
	    command: "MakeMove",
	    gid: "1",
	    name: "game",
	    x: 1,
	    y: 0,
	    user: "player2"
	};
        then=[{
            gid: "1",
            name:"game",
	    x: 1,
	    y: 0,
	    side: 'O',
            event:"GameOver",
            user: "player2",
	    winner: "player2"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
