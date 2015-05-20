'use strict';

jsChallenge.directive('jscInfoPane', function(jscInfoSrvc, $modal, $interval) {
  return {
    restrict: 'E',
    templateUrl: 'info-pane/info-pane-directive.html',
    scope: {
      disabled: '=jscDisabled'
    },
    link: function(scope, element) {
      scope.infoData=jscInfoSrvc.getInfo();
      scope.isDateTimeValid=true;
      var recalcFormattedInfo=function() {
        var mDate=moment(scope.infoData.date),
            mTime=moment(scope.infoData.time),
            mDur=moment.duration(scope.infoData.duration, 'minutes'),
            hrs=mDur.hours(), mins=mDur.minutes(), strHrs='', strMins='';

        if(hrs) {
          strHrs=hrs+(hrs>1?' hrs':' hr');
        }

        if(mins) {
          strMins=mins+(mins>1?' mins':' min');
        }

        scope.formattedDate=mDate.format('MMM D, YYYY');
        scope.formattedTime=mTime.format('h:mm A');
        scope.formattedDuration=strHrs+' '+strMins;
      };
      recalcFormattedInfo();

      scope.$watch('infoData',function(newVal, oldVal){
        recalcFormattedInfo();
        scope.isDateTimeValid=jscInfoSrvc.isDateTimeValid();
      }, true);

      $interval(function(){
        scope.isDateTimeValid=jscInfoSrvc.isDateTimeValid();
      },60*1000);

      scope.clickDate=function() {
        $modal.open({
          templateUrl: 'modals/date/date-view.html',
          controller: 'modalDateCtrl'
        });
      };

      scope.clickTime=function() {
        $modal.open({
          templateUrl: 'modals/time/time-view.html',
          controller: 'modalTimeCtrl'
        });
      };

      scope.clickDuration=function() {
        $modal.open({
          templateUrl: 'modals/duration/duration-view.html',
          controller: 'modalDurationCtrl'
        });
      };
    }
  }
});