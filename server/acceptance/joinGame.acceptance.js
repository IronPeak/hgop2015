'use strict';

var user = require('./user.acceptance');
var given = require('./given.acceptance');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

describe('JoinGame acceptance test:', function () {

    it('Should join game', function (done) {
        given(user("HrafnOrri").createGame("JGTestGame1")).and(user("BaraDrofn").joinGame("JGTestGame1")).expect("GameJoined").isOk(done);
    });
});
