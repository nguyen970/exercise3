'use strict';

// Declare app level module which depends on views, and components
angular.module('app', ['ngRoute', 'app.user']).config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {

    $routeProvider.when("/", {
      templateUrl: 'modules/users/views/userlist.html',
      controller: 'UserListCtrl'
    }).otherwise({redirectTo: '/userlist'});

  }]);
