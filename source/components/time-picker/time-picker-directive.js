'use strict';

jsChallenge.directive('jscTimePicker', function() {
  return {
    restrict: 'E',
    templateUrl: 'time-picker/time-picker-directive.html',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element) {

    }
  }
});
