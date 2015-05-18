'use strict';

jsChallenge.controller('modalDurationCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.duration=jscInfoSrvc.getInfo().duration;

  $scope.close=function() {
    jscInfoSrvc.getInfo().duration=$scope.duration;
    $modalInstance.close();
  };

});
