'use strict';

jsChallenge.controller('modalTimeCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.infoData=jscInfoSrvc.getInfo();

  $scope.close=function() {
    $modalInstance.close();
  };

});
