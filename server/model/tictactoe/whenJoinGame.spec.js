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
            gid: "12355",
            name:"TheFirstGame",
            user: "123TestPlayer2"
        };
        then=[{
            gid: "12355",
	    name: "TheFirstGame",
            event:"IllegalAction",
            user: "123TestPlayer2"
	}];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
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
        then=[{
            gid: "123",
	    name: "Game2",
            event:"IllegalAction",
            user: "Oid"
	}];

	var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Require O username',function(){
        given=[{
            gid: "123444",
            name:"Game",
	    event: "GameCreated",
            user : "Xid"
        }];
        when={
            command:"JoinGame",
            gid: "123444",
            name:"Game",
            user: undefined
        };
        then=[{
            gid: "123444",
	    name: "Game",
            event:"IllegalAction",
            user: undefined
	}];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Fail if X and O have same name',function(){
        given=[{
            gid: "1223",
            name:"Game",
	    event: "GameCreated",
            user : "NAME"
        }];
        when={
            command:"JoinGame",
            gid: "1223",
            name:"Game",
            user: "NAME"
        };
        then=[{
            gid: "1223",
	    name: "Game",
            event:"IllegalAction",
            user: "NAME"
	}];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Fail if game us full',function(){
        given=[{
            gid: "1423",
            name:"Game",
	    event: "GameCreated",
            user: "NAME1"
        },
	{
	    gid: "1423",
	    name: "Game",
	    event: "GameJoined",
	    user: "NAME2"
	}];
        when={
            command:"JoinGame",
            gid: "1423",
            name:"Game",
            user: "NAME3"
        };
        then=[{
            gid: "1423",
	    name: "Game",
            event:"IllegalAction",
            user: "NAME3"
	}];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
