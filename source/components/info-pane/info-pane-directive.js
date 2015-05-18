'use strict';

jsChallenge.directive('jscInfoPane', function(jscInfoSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'info-pane/info-pane-directive.html',
    link: function(scope, element) {
      scope.infoData=jscInfoSrvc.getInfo();
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
        if(newVal===oldVal) return;
        recalcFormattedInfo();
      }, true);
    }
  }
});