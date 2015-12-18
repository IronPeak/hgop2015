'use strict';

describe('Controller: TictactoeControllerCtrl', function () {

  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http, location, interval;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http, $location, $interval) {
    http = $http;
    interval = $interval;
    httpBackend = $injector.get('$httpBackend');
    location = $location;
    location.search('gid', '123');
    location.search('side', 'X');

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });

  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should generate join url', function () {
    getHistory();

    expect(scope.joinUrl).toBe('http://server:80/join/123');
  });

  it('should init creator to side X', function () {
    getHistory();

    expect(scope.me).toBe('Creator');
  });

  it('should init joiner to side O', function () {

    location.search('side', 'O');

    getHistory();

    expect(scope.me).toBe('Joiner');
  });


  function getHistory() {
    httpBackend.expectGET('/api/gameHistory/123').respond([{
      event: 'GameCreated',
      name: 'ThereCanOnlyBeOne',
      gid: '123',
      user: 'Creator'
    }, {
      event: 'GameJoined',
      name: 'ThereCanOnlyBeOne',
      gid: '123',
      user: 'Joiner'
    }]);
    httpBackend.flush();
  }

  it('should post side from current user X', function () {
    getHistory();
    httpBackend.expectPOST('/api/makeMove/', {
      gid: '87687',
      name: 'Gimmity',
      command: 'MakeMove',
      user: 'Hrafn',
      x:2, 
      y:0,
      side: 'X'
    }).respond([
      {
        event: 'MoveMade',
        user: 'Hrafn',
        x:2, 
	y:0,
        side: 'X'
      }
    ]);

    scope.gid = '87687';
    scope.name = 'Gimmity';

    location.search('side', 'X');
    scope.me = 'Hrafn';
    scope.gameState.gid = '87687';

    scope.makeMove(2, 0);
    httpBackend.flush();

    expect(scope.myTurn()).toBe(false);

  });

  it('should post side from current user O', function () {
    location.search('side', 'O');

    getHistory();
    httpBackend.expectPOST('/api/makeMove/', {
      gid: '87687',
      name: 'Game44',
      command: 'MakeMove',
      user: 'Hrafn',
      x:2, 
      y:1,
      side: 'O'
    }).respond([
      {
        event: 'MoveMade',
        user: 'Hrafn',
        x:2, 
	y:1,
        side: 'O'
      }
    ]);


    scope.gid = '123';
    scope.name = 'Game44';
    scope.gameState.nextTurn = 'O';

    scope.me = 'Hrafn';
    scope.gameState.gid = '87687';

    scope.makeMove(2, 1);
    httpBackend.flush();

    expect(scope.myTurn()).toBe(false);

  });

  it('should refresh history once every one second', function () {
    getHistory();

    httpBackend.expectGET('/api/gameHistory/123').respond([{
      event: 'GameCreated',
      name: 'Game Number one',
      gid: '123',
      user: 'Creator'
    }, {
      event: 'GameJoined',
      name: 'Game Number one',
      gid: '123',
      user: 'Joiner'
    }]);

    interval.flush(2001);

    httpBackend.flush();
  });
});


