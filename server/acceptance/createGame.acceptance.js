'use strict';

var user = require('./user.acceptance');
var given = require('./given.acceptance');

describe('CreateGame acceptance test:', function () {

    it('Should join game', function (done) {
        given(user("HrafnOrri").createGame("CGTestGame1"))
	.expectEvent("GameCreated").isOk(done);
    });
});
