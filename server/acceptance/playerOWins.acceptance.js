'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('Player O wins acceptance test:', function () {

    it('Player O wins', function (done) {
        given(user("Hrabbi").createGame("PlayerOWins").named("Victory"))
	.and(user("Barilius").joinGame("PlayerOWins"))
	.and(user("Hrabbi").as('X').makeMove(1, 0))
	.and(user("Barilius").as('O').makeMove(0, 1))
	.and(user("Hrabbi").as('X').makeMove(1, 2))
	.and(user("Barilius").as('O').makeMove(0, 2))
	.and(user("Hrabbi").as('X').makeMove(2, 1))
	.and(user("Barilius").as('O').makeMove(0, 0))
	.expectEvent("GameOver").byUser("Barilius").atPosition(0, 0).withWinner("Barilius").isOk(done);
    });
});
