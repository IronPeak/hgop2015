var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      command:"CreateGame",
      id:"1234",
      gid:"1235",
      name:"TheFirstGame",
      playerX : "Gulli"
    };
    then=[{
      id:"1234",
      gid:"1235",
      name:"TheFirstGame",
      event:"GameCreated",
      playerX: "Gulli"
    }];

    var actualEvents = tictactoeCommandHandler(given).execute(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
