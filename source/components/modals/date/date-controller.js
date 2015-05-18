'use strict';

jsChallenge.controller('modalDateCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.date=jscInfoSrvc.getInfo().date;

  $scope.close=function() {
    jscInfoSrvc.getInfo().date=$scope.date;
    $modalInstance.close();
  };

});
