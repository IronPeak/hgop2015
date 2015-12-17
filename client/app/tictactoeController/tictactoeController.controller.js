'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, gameState, guid, $location, $interval) {

    $scope.gameState = gameState();

    var thenHandleEvents = function (postPromise) {
      postPromise.then(function (data) {
        $scope.gameState.mutate(data.data);
      });

      postPromise.then(function(){

        if (mySide() === 'X'){
	  $scope.myside = 'X';
	  $scope.otherside = 'O';
          $scope.me = $scope.gameState.creatingUser;
          $scope.other = $scope.gameState.joiningUser;
        } else {
	  $scope.myside = 'O';
	  $scope.otherside = 'X';
          $scope.other = $scope.gameState.creatingUser;
          $scope.me = $scope.gameState.joiningUser;
        }

        $scope.joinUrl = 'http://' + $location.host() +( $location.port() ? ':' + $location.port() :'') + '/join/' + $scope.gameState.gid;

      });
    };


    var gid = $location.search().gid;

    function refresh() {
      thenHandleEvents($http.get('/api/gameHistory/' + gid));
    }

    refresh();
    $interval(refresh, 2000);

    function mySide() {
      return $location.search().side;
    }

    $scope.myTurn = function () {
      return mySide() === $scope.gameState.nextTurn;
    };

    $scope.makeMove = function (x, y) {
      if(!$scope.myTurn()){
        return;
      }
      thenHandleEvents($http.post('/api/makeMove/', {
	  command: 'MakeMove',
          gid: $scope.gameState.gid,
	  name: $scope.gameState.name,
	  x: x,
	  y: y,
	  side: mySide(),
          user: $scope.me
        }
      ));
    };
  });
