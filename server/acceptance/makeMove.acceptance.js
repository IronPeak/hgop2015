'use strict';

var user = require('./user.acceptance');
var given = require('./given.acceptance');

describe('MakeMove acceptance test:', function () {

    it('Should join game', function (done) {
        given(user("HrafnOrri").createGame("MMGTestGame1"))
	.and(user("BaraDrofn").joinGame("MMGTestGame1"))
	.and(user("HrafnOrri").makeMove(1, 1))
	.expect("MoveMade").isOk(done);
    });
});
