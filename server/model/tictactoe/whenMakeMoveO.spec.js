var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('MakeMoveO command:', function(){
    var given, when, then;

    beforeEach(function(){
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
    });

    it('Should make a move',function(){
        given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 0,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        });
        when={
            command:"MakeMoveO",
            gid: "1235",
            name:"TheFirstGame",
	    x: 1,
	    y: 1,
            playerO: "Halli"
        };
        then=[{
            gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 1,
	    side: 'O',
            event: "MoveMade",
	    playerO: "Halli"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Can not make first move',function(){
        when={
            command:"MakeMoveO",
            gid: "1235",
            name:"TheFirstGame",
	    x: 1,
	    y: 1,
            playerO: "Halli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can not make move in filled spot',function(){
        given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 0,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        });
        when={
            command:"MakeMoveO",
            gid: "1235",
            name:"TheFirstGame",
	    x: 0,
	    y: 0,
            playerO: "Halli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can not make move outside board',function(){
        given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 0,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        });
        when={
            command:"MakeMoveO",
            gid: "1235",
            name:"TheFirstGame",
	    x: 3,
	    y: 2,
            playerO: "Halli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Can make second move',function(){
        given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 0,
	    y: 0,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        });
	given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 1,
	    side: 'O',
            event: "MoveMade",
	    playerX: "Gulli"
        });
	given.push({
            gid: "1235",
	    name: "TheFirstGame",
	    x: 2,
	    y: 2,
	    side: 'X',
            event: "MoveMade",
	    playerX: "Gulli"
        });
        when={
            command:"MakeMoveO",
            gid: "1235",
            name:"TheFirstGame",
	    x: 1,
	    y: 2,
            playerO: "Halli"
        };
        then=[{
	    gid: "1235",
	    name: "TheFirstGame",
	    x: 1,
	    y: 2,
	    side: 'O',
            event: "MoveMade",
	    playerO: "Halli"
	}];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
