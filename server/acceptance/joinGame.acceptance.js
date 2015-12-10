'use strict';

var user = require('./user.acceptance');
var given = require('./given.acceptance');

describe('JoinGame acceptance test:', function () {

    it('Should join game', function (done) {
        given(user("HrafnOrri").createGame("JGTestGame1"))
	.and(user("BaraDrofn").joinGame("JGTestGame1"))
	.expectEvent("GameJoined").isOk(done);
    });
});
