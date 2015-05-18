'use strict';

jsChallenge.directive('jscTimePicker', function($interval) {
  return {
    restrict: 'E',
    templateUrl: 'time-picker/time-picker-directive.html',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element) {
      /*
      On Change
      If Invalid value, move to the next valid
      Example: MinTime=8:00; If decrease 8:00, it sets 23:50 (decreases 24:00); If increase 23:50, it sets 8:00
      */

      function updateLimitDates() {
        scope.minDate=new Date(Date.now() + 2 * 3600 * 1000);
      }
      updateLimitDates();

      var intervalUpdateLimitDates=$interval(function(){
        updateLimitDates();
      },15*60000);

      // Cancel Intervals on Destroy
      scope.$on('$destroy', function() {
        $interval.cancel( intervalUpdateLimitDates );
      });

    }
  }
});
