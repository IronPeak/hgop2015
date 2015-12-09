'use strict';

var user = require('./user.acceptance');
var given = require('./given.acceptance');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

describe('CreateGame acceptance test:', function () {

    it('Should join game', function (done) {
        given(user("HrafnOrri").createGame("CGTestGame1")).expect("GameCreated").isOk(done);
    });
});
