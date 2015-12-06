var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('MakeMoveX command:', function(){
    var given, when, then;

    it('Should make a move',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        },{
	    gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            playerX: "Gulli",
	    playerO: "Halli"
        }];
        when={
            command:"MakeMoveX",
            gid: "1235",
            name:"TheFirstGame",
	    x: 1,
	    y: 1,
            playerX: "Gulli"
        };
        then=[{
            gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Game must have an opponent',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        }];
        when={
            command:"MakeMoveX",
            gid: "1235",
            name:"TheFirstGame",
	    x: 1,
	    y: 1,
            playerX: "Gulli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can not make move twice in a row',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        },{
	    gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            playerX: "Gulli",
	    playerO: "Halli"
        },{
	    gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
	}];
        when={
            command:"MakeMoveX",
            gid: "1235",
            name:"TheFirstGame",
	    x: 2,
	    y: 2,
            playerX: "Gulli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can not make move outside the board',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        },{
	    gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            playerX: "Gulli",
	    playerO: "Halli"
        }];
        when={
            command:"MakeMoveX",
            gid: "1235",
            name:"TheFirstGame",
	    x: 3,
	    y: 1,
            playerX: "Gulli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can make move after playerO',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        },{
	    gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            playerX: "Gulli",
	    playerO: "Halli"
        },{
            gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        },{
            gid: "1235",
	    name: "TheFirstGame",
	    x: 2,
	    y: 0,
	    side: 'O',
            event: "MoveMade",
	    playerX: "Halli"
        }];
        when={
            command:"MakeMoveX",
            gid: "1235",
            name:"TheFirstGame",
	    x: 2,
	    y: 1,
            playerX: "Gulli"
        };
        then=[{
            gid: "1235",
	    name: "TheFirstGame",
	    x: 2,
	    y: 1,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
