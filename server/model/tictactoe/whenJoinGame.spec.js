var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('JoinGame command:', function(){
    var given, when, then;

    it('Should join a game',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            playerX : "Gulli"
        }];
        when={
            command:"JoinGame",
            gid: "1235",
            name:"TheFirstGame",
            playerO: "Halli"
        };
        then=[{
            gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            playerX: "Gulli",
	    playerO: "Halli"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Fail to join nonexistig game',function(){
        given=[];
        when={
            command:"JoinGame",
            gid: "1235",
            name:"TheFirstGame",
            playerO: "Halli"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Require gid and name',function(){
        given=[{
            gid: "123",
            name:"Game",
	    event: "GameCreated",
            playerX : "Xid"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game2",
            playerO: "Oid"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Require O username',function(){
        given=[{
            gid: "123",
            name:"Game",
	    event: "GameCreated",
            playerX : "Xid"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game",
            playerO: undefined
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Fail if X and O have same name',function(){
        given=[{
            gid: "123",
            name:"Game",
	    event: "GameCreated",
            playerX : "NAME"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game2",
            playerO: "NAME"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });

    it('Fail if game us full',function(){
        given=[{
            gid: "123",
            name:"Game",
	    event: "GameCreated",
            playerX: "NAME1"
        },
	{
	    gid: "123",
	    name: "Game",
	    event: "GameJoined",
	    playerO: "NAME2"
	}];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game",
            playerO: "NAME3"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });
});
