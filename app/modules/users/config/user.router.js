'use strict';

angular.module('app.user', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/userlist', {
      templateUrl: 'modules/users/views/userlist.html',
      controller: 'UserListCtrl'
    })
      .when('/userdetail/:id', {
      templateUrl: 'modules/users/views/userdetail.html',
      controller: 'UserDetailCtrl'
    });
  }]);