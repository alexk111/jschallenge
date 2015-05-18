'use strict';

jsChallenge.controller('modalWizardCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  var totalSteps=5,
      progressStep=100/(totalSteps-1);
  $scope.curStep=1;
  $scope.progress=0;

  $scope.infoData=jscInfoSrvc.getInfo();

  $scope.$watch('infoData.date', function(newVal, oldVal){
    if(oldVal === newVal){
        return;
    }
    if(newVal) {
      $scope.nextStep();
    }
  });

  $scope.$watch('infoData.duration', function(newVal, oldVal){
    if(oldVal === newVal){
        return;
    }
    if(newVal) {
      $scope.nextStep();
    }
  });

  $scope.nextStep=function() {
    $scope.curStep++;
    $scope.progress=($scope.curStep-1)*progressStep;
  };
  $scope.finish=function() {
    $modalInstance.close();
  }


});
