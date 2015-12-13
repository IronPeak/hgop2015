var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('Capacity Tests:', function() {

    it('Should play 1000 games in 5 seconds.', function(done) {

	var startTime = new Date().getTime();
        var gamesToPlay = 1000;
        var x = 6;

        var doneCount = 0;

        var QED = function() {
            if (gamesToPlay === ++doneCount) {
		var currentTime = new Date().getTime();
                var elapsedTime = currentTime - startTime;
		if(x * 1000 < elapsedTime) {
		    done(new Error(elapsedTime + " should be below " + (x * 1000)));		
		} else {
                    done();
		}
            }
        };

        for (var gid = 0; gid < gamesToPlay; gid++) {
            given(user("TestUser1").createGame("CapacityTest" + gid).named("Game" + gid))
                .and(user("TestUser2").joinGame("CapacityTest" + gid))
                .and(user("TestUser1").as('X').makeMove(0, 0))
                .and(user("TestUser2").as('O').makeMove(0, 1))
                .and(user("TestUser1").as('X').makeMove(0, 2))
                .and(user("TestUser2").as('O').makeMove(1, 1))
                .and(user("TestUser1").as('X').makeMove(1, 0))
                .and(user("TestUser2").as('O').makeMove(1, 2))
                .and(user("TestUser1").as('X').makeMove(2, 1))
                .and(user("TestUser2").as('O').makeMove(2, 0))
                .and(user("TestUser1").as('X').makeMove(2, 2))
                .expectEvent("GameDraw").byUser("TestUser1").isOk(QED);
        }
    });
});
