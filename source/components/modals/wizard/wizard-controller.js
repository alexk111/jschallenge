'use strict';

jsChallenge.controller('modalWizardCtrl', function($scope, $modalInstance, jscInfoSrvc) {
  var totalSteps=5,
      progressStep=100/(totalSteps-1);
  $scope.curStep=1;
  $scope.progress=0;

  $scope.date=jscInfoSrvc.getInfo().date;
  $scope.time=jscInfoSrvc.getInfo().time;
  $scope.duration=0;

  $scope.$watch('date', function(newVal, oldVal){
    if(oldVal === newVal){
        return;
    }
    if(newVal) {
      $scope.nextStep();
    }
  });

  $scope.$watch('duration', function(newVal, oldVal){
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
    jscInfoSrvc.getInfo().date=$scope.date;
    jscInfoSrvc.getInfo().time=$scope.time;
    jscInfoSrvc.getInfo().duration=$scope.duration;

    $modalInstance.close();
  }


});
