'use strict';

jsChallenge.controller('modalTimeCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.time=jscInfoSrvc.getInfo().time;

  $scope.close=function() {
    jscInfoSrvc.getInfo().time=$scope.time;
    $modalInstance.close();
  };

});
