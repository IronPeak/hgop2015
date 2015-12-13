'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('MakeMove acceptance test:', function() {

    it('Should make a move', function(done) {
        given(user("HrafnOrri").createGame("MMGTestGame1"))
            .and(user("BaraDrofn").joinGame("MMGTestGame1"))
            .and(user("HrafnOrri").makeMove(1, 1))
            .expectEvent("MoveMade").byUser("HrafnOrri").atPosition(1, 1).isOk(done);
    });

    it('player O can make a move', function(done) {
        given(user("HrafnOrri").createGame("MMGTestGame2"))
            .and(user("BaraDrofn").joinGame("MMGTestGame2"))
            .and(user("HrafnOrri").makeMove(1, 1))
            .and(user("BaraDrofn").makeMove(2, 1))
            .expectEvent("MoveMade").byUser("BaraDrofn").atPosition(2, 1).isOk(done);
    });
});
