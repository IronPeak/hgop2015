'use strict';

describe('Controller: CreateGameCtrl', function() {

    // load the controller's module
    beforeEach(module('tictactoeApp'));

    var CreateGameCtrl, scope, httpBackend, location;

    beforeEach(function() {
        module(function($provide) {
            var guids = ['12345'];

            $provide.value('guid', function() {
                return guids.pop();
            });
        });

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $location) {
        httpBackend = $httpBackend;
        location = $location;
        scope = $rootScope.$new();
        CreateGameCtrl = $controller('CreateGameCtrl', {
            $scope: scope
        });
    }));


    it('should post variables from scope for guid, name and userName and process resulting events, and assign me to X', function() {
        httpBackend.expectPOST('/api/createGame/', {
            command: 'CreateGame',
            gid: '12345',
            name: 'TheSecondGame',
            user: 'Barus'
        }).respond([{
            gid: '12345',
            name: 'TheSecondGame',
            event: 'GameCreated',
            user: 'Barus'
        }]);

        scope.name = 'TheSecondGame';

        scope.user = 'Barus';

        scope.createGame();
        httpBackend.flush();

        expect(location.search().gid).toBe('12345');
        expect(location.search().side).toBe('X');
        expect(location.path()).toBe('/tictactoe');

    });
});
