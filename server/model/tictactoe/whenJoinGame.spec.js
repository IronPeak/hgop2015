var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('JoinGame command:', function() {
    var given, when, then;

    it('Should join a game', function() {
        given = [{
            gid: "fae234",
            name: "TheFirstGame",
            event: "GameCreated",
            user: "123TestPlayer"
        }];
        when = {
            command: "JoinGame",
            gid: "fae234",
            name: "TheFirstGame",
            user: "123TestPlayer2"
        };
        then = [{
            gid: "fae234",
            name: "TheFirstGame",
            event: "GameJoined",
            user: "123TestPlayer2"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Fail to join nonexistig game', function() {
        given = [];
        when = {
            command: "JoinGame",
            gid: "efasdfas",
            name: "TheFirstGame",
            user: "123TestPlayer2"
        };
        then = [{
            gid: "efasdfas",
            name: "TheFirstGame",
            event: "IllegalAction",
            user: "123TestPlayer2"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Require O username', function() {
        given = [{
            gid: "123444",
            name: "Game",
            event: "GameCreated",
            user: "Xid"
        }];
        when = {
            command: "JoinGame",
            gid: "123444",
            name: "Game",
            user: undefined
        };
        then = [{
            gid: "123444",
            name: "Game",
            event: "IllegalAction",
            user: undefined
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
