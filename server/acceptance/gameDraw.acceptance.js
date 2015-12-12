'use strict';

var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

describe('Game draw acceptance test:', function () {

    it('Creating Game', function (done) {
        given(user("TestUser1").createGame("GameDrawTest00").named("fasdfasg"))
	.expectEvent("GameCreated").byUser("TestUser1").isOk(done);
    });

    it('Join Game', function (done) {
        given(user("TestUser1").createGame("GameDrawTest01").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest01"))
	.expectEvent("GameJoined").byUser("TestUser2").isOk(done);
    });

    it('Move 1', function (done) {
        given(user("TestUser1").createGame("GameDrawTest02").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest02"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.expectEvent("MoveMade").byUser("TestUser1").isOk(done);
    });

    it('Move 2', function (done) {
        given(user("TestUser1").createGame("GameDrawTest03").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest03"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.expectEvent("MoveMade").byUser("TestUser2").isOk(done);
    });

    it('Move 3', function (done) {
        given(user("TestUser1").createGame("GameDrawTest04").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest04"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.expectEvent("MoveMade").byUser("TestUser1").isOk(done);
    });

    it('Move 4', function (done) {
        given(user("TestUser1").createGame("GameDrawTest05").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest05"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.expectEvent("MoveMade").byUser("TestUser2").isOk(done);
    });

    it('Move 5', function (done) {
        given(user("TestUser1").createGame("GameDrawTest06").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest06"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.and(user("TestUser1").as('X').makeMove(1, 0))
	.expectEvent("MoveMade").byUser("TestUser1").isOk(done);
    });

    it('Move 6', function (done) {
        given(user("TestUser1").createGame("GameDrawTest07").named("fasdfasg"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.and(user("TestUser1").as('X').makeMove(1, 0))
	.and(user("TestUser2").as('O').makeMove(1, 2))
	.expectEvent("MoveMade").byUser("TestUser2").isOk(done);
    });

    it('Move 7', function (done) {
        given(user("TestUser1").createGame("GameDrawTest08").named("fasdfasg"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.and(user("TestUser1").as('X').makeMove(1, 0))
	.and(user("TestUser2").as('O').makeMove(1, 2))
	.and(user("TestUser1").as('X').makeMove(2, 1))
	.expectEvent("MoveMade").byUser("TestUser1").isOk(done);
    });

    it('Move 8', function (done) {
        given(user("TestUser1").createGame("GameDrawTest09").named("fasdfasg"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.and(user("TestUser1").as('X').makeMove(1, 0))
	.and(user("TestUser2").as('O').makeMove(1, 2))
	.and(user("TestUser1").as('X').makeMove(2, 1))
	.and(user("TestUser2").as('O').makeMove(2, 0))
	.expectEvent("MoveMade").byUser("TestUser2").isOk(done);
    });

    it('Should be a draw', function (done) {
        given(user("TestUser1").createGame("GameDrawTest10").named("fasdfasg"))
	.and(user("TestUser2").joinGame("GameDrawTest10"))
	.and(user("TestUser1").as('X').makeMove(0, 0))
	.and(user("TestUser2").as('O').makeMove(0, 1))
	.and(user("TestUser1").as('X').makeMove(0, 2))
	.and(user("TestUser2").as('O').makeMove(1, 1))
	.and(user("TestUser1").as('X').makeMove(1, 0))
	.and(user("TestUser2").as('O').makeMove(1, 2))
	.and(user("TestUser1").as('X').makeMove(2, 1))
	.and(user("TestUser2").as('O').makeMove(2, 0))
	.and(user("TestUser1").as('X').makeMove(2, 2))
	.expectEvent("GameDraw").byUser("TestUser1").atPosition(2, 2).isOk(done);
    });
});
