'use strict';

jsChallenge.controller('modalWizardCtrl', function($scope, $modalInstance) {
  var totalSteps=5,
      progressStep=100/(totalSteps-1);
  $scope.curStep=1;
  $scope.progress=0;

  $scope.dt=false;

  $scope.$watch('dt', function(newVal, oldVal){
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
