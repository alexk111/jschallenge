'use strict';

jsChallenge.controller('modalDurationCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.infoData=jscInfoSrvc.getInfo();

  $scope.close=function() {
    $modalInstance.close();
  };

});
