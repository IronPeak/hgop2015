'use strict';

angular.module('tictactoeApp')
  .controller('CreateGameCtrl', function ($scope, $http, guid, $location) {
    $scope.createGame = function () {

      var gid = guid();
      var createPost = $http.post('/api/createGame/', {
          'command': 'CreateGame',
	  'gid': gid,
          'name': $scope.name,
	  'user': $scope.user
        }
      );
      createPost.then(function (response) {
        $location.url('/tictactoe');
        $location.search('gid', response.data[0].gid);
        $location.search('side', 'X');
      });

    };

  });
