'use strict';

angular.module('app.user').directive('userTable',
  function() {
    return {
      restrict : "E",
      templateUrl: 'modules/users/views/usertable.html',
      require: '^ngModel',
      scope: {
        ngModel: '='
      }
    };
  });

