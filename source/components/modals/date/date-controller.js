'use strict';

jsChallenge.controller('modalDateCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  $scope.infoData=jscInfoSrvc.getInfo();

  $scope.close=function() {
    $modalInstance.close();
  };

});
