'use strict';

angular.module('app.user').controller('UserListCtrl', ['$scope', 'UserService',

  function($scope, UserService) {

    UserService.getAllUsers().then(function(response){
      $scope.users = response.data;
    }).catch(function(error) {
      console.log('Unable to load data. Error: ' + error);
    });

  }]);

