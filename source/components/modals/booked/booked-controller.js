'use strict';

jsChallenge.controller('modalBookedCtrl', function($scope, $modalInstance) {
  $scope.close=function() {
    $modalInstance.close();
  };
});
