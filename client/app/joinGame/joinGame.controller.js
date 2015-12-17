'use strict';

angular.module('tictactoeApp')
  .controller('JoinGameCtrl', function ($scope, $http, $location, gameState, $state) {

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      });
    };

    $scope.gameState = gameState();

    thenHandleEvents($http.get('/api/gameHistory/' + $state.params.gid));

    $scope.joinGame = function () {
      var joinPostPromise = $http.post('/api/joinGame/', {
	  'command': 'JoinGame',
          'gid': $scope.gameState.gid,
	  'name': $scope.gameState.name,
          'user': $scope.user
        }
      );
      thenHandleEvents(joinPostPromise);
      joinPostPromise.then(function () {
        $location.url('/tictactoe');
        $location.search('side', 'O');
        $location.search('gid', $scope.gameState.gid);
      });
    };
  });
