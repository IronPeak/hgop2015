'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('Player X wins acceptance test:', function () {

    it('Player X wins', function (done) {
        given(user("Hrabbi").createGame("PlayerXWins").named("Victory"))
	.and(user("Barilius").joinGame("PlayerXWins"))
	.and(user("Hrabbi").as('X').makeMove(1, 0))
	.and(user("Barilius").as('O').makeMove(0, 1))
	.and(user("Hrabbi").as('X').makeMove(1, 2))
	.and(user("Barilius").as('O').makeMove(0, 2))
	.and(user("Hrabbi").as('X').makeMove(1, 1))
	.expectEvent("GameOver").byUser("Hrabbi").atPosition(2, 2).withWinner("Hrabbi").isOk(done);
    });
});
