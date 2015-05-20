'use strict';

jsChallenge.controller('jsChallengeCtrl', function($scope, $modal, jscInfoSrvc, $interval, jscLocationsSrvc) {
  $scope.appLoaded=true;
  $scope.isDateTimeValid=true;

  $scope.infoData=jscInfoSrvc.getInfo();
  $scope.jscLocationsSrvc=jscLocationsSrvc;

  $scope.$watch('infoData', function(){
    $scope.isDateTimeValid=jscInfoSrvc.isDateTimeValid();
    if($scope.isDateTimeValid) {
      jscLocationsSrvc.reload(jscInfoSrvc.getDateTime(), $scope.infoData.duration);
    }
  }, true);

  $interval(function(){
    $scope.isDateTimeValid=jscInfoSrvc.isDateTimeValid();
  },60*1000);

  /*
  $modal.open({
    templateUrl: 'modals/wizard/wizard-view.html',
    controller: 'modalWizardCtrl',
    backdrop: 'static',
    keyboard: false
  });
  */

});