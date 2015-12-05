var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('CreateGame command:', function(){
    var given, when, then;

    it('Should create a game',function(){
        given=[];
        when={
            command:"CreateGame",
            gid:"1235",
            name:"TheFirstGame",
            playerX: "Gulli"
        };
        then=[{
            gid:"1235",
            name:"TheFirstGame",
            event:"GameCreated",
            playerX: "Gulli"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Must include a gid',function(){
        given=[];
        when={
            command:"CreateGame",
            name:"TheFirstGame",
            playerX : "Gulli"
        };
        then=[];

        try {
            tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
			
	}
    });

    it('Must include a name',function(){
        given=[];
        when={
            command:"CreateGame",
	    gid:"1235",
            playerX : "Gulli"
        };
        then=[];

        try {
            tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
			
	}
    });

    it('Must include a playerX',function(){
        given=[];
        when={
            command:"CreateGame",
	    gid:"1235",
            name:"TheFirstGame",
            playerX : "Gulli"
        };
        then=[];

        try {
            tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
			
	}
    });

    it('Can only execute once',function(){
        given=[{
            gid:"1235",
            name:"TheFirstGame",
            event:"GameCreated",
            playerX: "Gulli"
        }];
        when={
            command:"CreateGame",
            gid:"1235",
            name:"TheFirstGame",
            playerX : "Gulli"
        };
        then=[];
	try {
            tictactoeCommandHandler(given).execute(when);
	    false.should.be(true);
	} catch(e) {
			
	}
    });
});
