var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('JoinGame command:', function(){
    var given, when, then;

    it('Should join a game',function(){
        given=[{
            gid: "1235",
            name:"TheFirstGame",
	    event: "GameCreated",
            user : "123TestPlayer"
        }];
        when={
            command:"JoinGame",
            gid: "1235",
            name:"TheFirstGame",
            user: "123TestPlayer2"
        };
        then=[{
            gid: "1235",
            name:"TheFirstGame",
            event:"GameJoined",
            user: "123TestPlayer2",
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
            user: "123TestPlayer2"
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
            user : "Xid"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game2",
            user: "Oid"
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
            user : "Xid"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game",
            user: undefined
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
            user : "NAME"
        }];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game2",
            user: "NAME"
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
            user: "NAME1"
        },
	{
	    gid: "123",
	    name: "Game",
	    event: "GameJoined",
	    user: "NAME2"
	}];
        when={
            command:"JoinGame",
            gid: "123",
            name:"Game",
            user: "NAME3"
        };
        then=[];

        try {
	    tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
	   	
	}
    });
});
