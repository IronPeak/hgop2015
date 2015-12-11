'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('Game draw acceptance test:', function () {

    it('Should result in a draw', function (done) {
        given(user("HrafnOrri").createGame("GDTestGame1"))
	.and(user("BaraDrofn").joinGame("GDTestGame1"))
	.and(user("HrafnOrri").makeMove(1, 0))
	.and(user("BaraDrofn").makeMove(0, 0))
	.and(user("HrafnOrri").makeMove(1, 1))
	.and(user("BaraDrofn").makeMove(2, 0))
	.and(user("HrafnOrri").makeMove(2, 1))
	.and(user("BaraDrofn").makeMove(0, 1))
	.and(user("HrafnOrri").makeMove(0, 2))
	.and(user("BaraDrofn").makeMove(1, 2))
	.and(user("HrafnOrri").makeMove(2, 2))
	.expectEvent("GameOver").byUser("HrafnOrri").atPosition(2, 2).withWinner(undefined).isOk(done);
    });
});
