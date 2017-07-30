'use strict';

angular.module('app.user').controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserService',
  function($scope, $routeParams, UserService) {

    UserService.getUserById($routeParams.id).then(function(response){
      $scope.user = response.data;
      UserService.getUserAddressByZip($scope.user.address.zipcode).then(function (response){
        $scope.user.address.state = UserService.getStateFromAddress(response.data.results[0]);
      }).catch(function(data){
        $scope.user.address.state = "Unknown";
      });
    }).catch(function(error){
      console.log("There were some errors: " + error);
    });

  }]);

