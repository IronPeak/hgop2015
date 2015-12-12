'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('CreateGame acceptance test:', function () {

    it('Should create game', function (done) {
        given(user("HrafnOrri").createGame("CGTestGame1"))
	.expectEvent("GameCreated").byUser("HrafnOrri").isOk(done);
    });
});
