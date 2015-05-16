'use strict';

jsChallenge.directive('jscDatePicker', function($interval) {
  return {
    restrict: 'E',
    templateUrl: 'date-picker/date-picker-directive.html',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element) {
      function updateLimitDates() {
        scope.minDate=new Date(Date.now() + 2 * 3600 * 1000);
      }
      updateLimitDates();

      var intervalUpdateLimitDates=$interval(function(){
        updateLimitDates();
      },15*60000);

      // Cancel Intervals on Destroy
      scope.$on("$destroy", function() {
        $interval.cancel( intervalUpdateLimitDates );
      });

    }
  }
});