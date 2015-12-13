'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('JoinGame acceptance test:', function() {

    it('Should join game', function(done) {
        given(user("HrafnOrri").createGame("JGTestGame1"))
            .and(user("BaraDrofn").joinGame("JGTestGame1"))
            .expectEvent("GameJoined").byUser("BaraDrofn").isOk(done);
    });
});
