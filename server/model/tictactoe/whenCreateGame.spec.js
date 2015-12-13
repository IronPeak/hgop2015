var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('CreateGame command:', function() {
    var given, when, then;

    it('Should create a game', function() {
        given = [];
        when = {
            command: "CreateGame",
            gid: "1234124",
            name: "TheFirstGame",
            user: "TestPlayer"
        };
        then = [{
            gid: "1234124",
            name: "TheFirstGame",
            event: "GameCreated",
            user: "TestPlayer"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Must include a gid', function() {
        given = [];
        when = {
            command: "CreateGame",
            name: "TheFirstGame",
            user: "TestPlayer"
        };
        then = [{
            gid: undefined,
            name: "TheFirstGame",
            event: "IllegalAction",
            user: "TestPlayer"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Must include a name', function() {
        given = [];
        when = {
            command: "CreateGame",
            gid: "516124",
            user: "TestPlayer"
        };
        then = [{
            gid: "516124",
            name: undefined,
            event: "IllegalAction",
            user: "TestPlayer"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Can only execute once', function() {
        given = [{
            gid: "51617",
            name: "TheFirstGame",
            event: "GameCreated",
            user: "TestPlayer"
        }];
        when = {
            command: "CreateGame",
            gid: "51617",
            name: "TheFirstGame",
            user: "TestPlayer"
        };
        then = [{
            gid: "51617",
            name: undefined,
            event: "IllegalAction",
            user: "TestPlayer"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
