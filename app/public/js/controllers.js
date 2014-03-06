'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('http://127.0.0.1:7070/api/v1/teams/boards').
  success(function(data, status, headers, config) {
    console.log("got ... "+data);
    $scope.boards = data;
  });
}

