'use strict';

describe('Factory: TictacToeState', function() {

    var gameState;
    // load the controller's module
    beforeEach(module('tictactoeApp'));


    // Initialize the controller and a mock scope
    beforeEach(inject(function(_gameState_) {
        gameState = _gameState_();
    }));

    it('Should add other player to game state when gameJoined', function() {
        gameState.mutate([{
            event: 'GameJoined',
            user: 'KFC',
            name: 'DarkHorse'
        }]);

        expect(gameState.joiningUser).toBe('KFC');
    });

    it('Should store gid and name from game created in game state.', function() {
        gameState.mutate([{
            event: 'GameCreated',
            gid: '198299',
            user: 'Big Mac',
            name: 'McDonalds',
        }]);

        expect(gameState.gid).toBe('198299');
        expect(gameState.name).toBe('McDonalds');
        expect(gameState.creatingUser).toBe('Big Mac');
    });

    it('Should add moves 0,1 to game board', function() {

        gameState.mutate([{
            event: 'MoveMade',
            user: 'OFC',
            name: 'CommonBro',
            x: 0,
            y: 1,
            side: 'X'
        }]);

        expect(gameState.board[0][1]).toBe('X');

    });

    it('Should add move 2,2 to board.', function() {

        gameState.mutate([{
            event: 'MoveMade',
            user: 'Sibling',
            name: 'Game3',
            x: 2,
            y: 2,
            side: 'O'
        }]);

        expect(gameState.board[2][2]).toBe('O');

    });

    it('Should mark nextTurn as opposite from last event.', function() {
        gameState.me = {
            side: 'O'
        };
        gameState.mutate([{
            event: 'MoveMade',
            user: 'HotDog',
            name: 'HotDogsGame',
            x: 2,
            y: 2,
            side: 'X'
        }]);

        expect(gameState.nextTurn).toBe('O');
    });

    it('Nextturn should default to X', function() {
        gameState.me = {
            side: 'X'
        };
        gameState.mutate([{
            event: 'GameCreated',
            user: 'MyNameIs',
            name: 'ChicaChica',
        }]);

        expect(gameState.nextTurn).toBe('X');
    });

    it('GameOver should set nextTurn to GameOver', function() {
        gameState.me = {
            side: 'X'
        };
        gameState.mutate([{
            event: 'GameOver',
            user: 'BraBra',
            name: 'DuckPond',
            x: 1,
            y: 1,
            side: 'X'
        }]);

        expect(gameState.nextTurn).toBe('GameOver');
        expect(gameState.winner).toBe('BraBra');
    });

    it('GameDraw should set nextTurn to GameOver', function() {
        gameState.me = {
            side: 'X'
        };
        gameState.mutate([{
            event: 'GameDraw',
            user: 'Bibbidy',
            name: 'Babbidy',
            x: 1,
            y: 1,
            side: 'X'
        }]);

        expect(gameState.nextTurn).toBe('GameOver');
        expect(gameState.gameDraw).toBe(true);
    });

    it('GameOver should set tile to side', function() {
        gameState.me = {
            side: 'O'
        };
        gameState.mutate([{
            event: 'GameOver',
            user: 'BraBra',
            name: 'DuckPond',
            x: 2,
            y: 2,
            side: 'O'
        }]);

        expect(gameState.board[2][2]).toBe('O');
    });

    it('GameDraw should set tile to side', function() {
        gameState.me = {
            side: 'X'
        };
        gameState.mutate([{
            event: 'GameDraw',
            user: 'Bibbidy',
            name: 'Babbidy',
            x: 1,
            y: 1,
            side: 'X'
        }]);

        expect(gameState.board[1][1]).toBe('X');
    });
});
