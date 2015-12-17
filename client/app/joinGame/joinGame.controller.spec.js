'use strict';

describe('Controller: JoinGameCtrl', function () {
 // load the controller's module
  beforeEach(module('tictactoeApp'));


  beforeEach(function(){
    module(function ($provide) {
      var guids=['123141'];

      $provide.value('guid', function () {
        return guids.pop();
      });
    });
  });

  var JoinGameCtrl, scope;
  var httpBackend;
  var location;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, $state) {

    httpBackend = $httpBackend;
    location = $location;

    $state.params.gid = '12312354';

    scope = $rootScope.$new();
    JoinGameCtrl = $controller('JoinGameCtrl', {
      $scope: scope
    });
  }));

  it('should ask to join game if game id already in scope, and assign me to O', function () {
    httpBackend.expectGET('/api/gameHistory/123').respond( [{
      gid: '12312354',
      name: 'SQL',
      event: 'GameCreated',
      user: 'BobbyTables'
    }]);
    httpBackend.expectGET('app/createGame/createGame.html').respond('');

    httpBackend.flush();

    httpBackend.expectPOST('/api/joinGame/', {
      command: 'JoinGame',
      gid: '12312354',
      name: 'SQL',
      user: 'DropBobby'
    }).respond([{
	gid: '12312354',
        name: 'SQL',
	event: 'GameJoined',
        user: 'DropBobby'
      }]
    );


    scope.user = 'DropBobby';

    scope.joinGame();


    httpBackend.expectGET('app/tictactoeController/tictactoe.html').respond('');
    httpBackend.flush();


    expect(location.search().side).toBe('O');
    expect(location.search().gid).toBe('12312354');
    expect(location.path()).toBe('/tictactoe');
  });
});
