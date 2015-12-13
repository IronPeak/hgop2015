var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('MakeMove command:', function() {
    var given, when, then;

    beforeEach(function() {
        given = [{
            gid: "1235",
            name: "TheFirstGame",
            event: "GameCreated",
            user: "Hrafn"
        }, {
            gid: "1235",
            name: "TheFirstGame",
            event: "GameJoined",
            user: "Bara"
        }];
    });

    it('Should make a move', function() {
        given.push({
            gid: "1235",
            name: "TheFirstGame",
            x: 0,
            y: 0,
            side: 'X',
            event: "MoveMade",
            user: "Hrafn"
        });
        when = {
            command: "MakeMove",
            gid: "1235",
            name: "TheFirstGame",
            x: 1,
            y: 1,
            side: 'O',
            user: "Bara"
        };
        then = [{
            gid: "1235",
            name: "TheFirstGame",
            x: 1,
            y: 1,
            side: 'O',
            event: "MoveMade",
            user: "Bara"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Can not make move in filled spot', function() {
        given.push({
            gid: "dfas",
            name: "TheFirstGame",
            x: 0,
            y: 0,
            side: 'X',
            event: "MoveMade",
            user: "Hrafn"
        });
        when = {
            command: "MakeMove",
            gid: "dfas",
            name: "TheFirstGame",
            x: 0,
            y: 0,
            side: 'O',
            user: "Bara"
        };
        then = [{
            gid: "dfas",
            name: "TheFirstGame",
            event: "IllegalMove",
            user: "Bara"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('Can make second move', function() {
        given.push({
            gid: "1235",
            name: "TheFirstGame",
            x: 0,
            y: 0,
            side: 'X',
            event: "MoveMade",
            user: "Hrafn"
        });
        given.push({
            gid: "1235",
            name: "TheFirstGame",
            x: 1,
            y: 1,
            side: 'O',
            event: "MoveMade",
            user: "Hrafn"
        });
        given.push({
            gid: "1235",
            name: "TheFirstGame",
            x: 2,
            y: 2,
            side: 'X',
            event: "MoveMade",
            user: "Hrafn"
        });
        when = {
            command: "MakeMove",
            gid: "1235",
            name: "TheFirstGame",
            x: 1,
            y: 2,
            side: 'O',
            user: "Bara"
        };
        then = [{
            gid: "1235",
            name: "TheFirstGame",
            x: 1,
            y: 2,
            side: 'O',
            event: "MoveMade",
            user: "Bara"
        }];

        var actualEvents = tictactoeCommandHandler(given).execute(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
