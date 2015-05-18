'use strict';

jsChallenge.controller('jsChallengeCtrl', function($scope, $modal, jscInfoSrvc, $timeout, jscLocationsSrvc) {
  $scope.appLoaded=true;

  $scope.infoData=jscInfoSrvc.getInfo();
  $scope.jscLocationsSrvc=jscLocationsSrvc;

  $scope.$watch('infoData', function(){
    jscLocationsSrvc.reload($scope.infoData.date, $scope.infoData.time, $scope.infoData.duration);
  }, true);

  $modal.open({
    templateUrl: 'modals/wizard/wizard-view.html',
    controller: 'modalWizardCtrl',
    backdrop: 'static',
    keyboard: false
  });

});