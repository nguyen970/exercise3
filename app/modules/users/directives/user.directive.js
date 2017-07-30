'use strict';

angular.module('app.user').directive('user', ['UserService',
  function(UserService) {
    return {
      restrict : "E",
      templateUrl: 'modules/users/views/user.html',
      require: '^ngModel',
      scope: {
        ngModel: '='
      }, 
      link: function ($scope, element, attrs) {
        var user = $scope.ngModel;

        UserService.getUserAddressByZip($scope.ngModel.address.zipcode).then(function (response){
          $scope.ngModel.address.state = UserService.getStateFromAddress(response.data.results[0]);
        }).catch(function(data){
          $scope.ngModel.address.state = "Unknown";
        });
      }
    };
  }]);

