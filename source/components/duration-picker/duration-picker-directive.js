'use strict';

jsChallenge.directive('jscDurationPicker', function() {
  return {
    restrict: 'E',
    templateUrl: 'duration-picker/duration-picker-directive.html',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element) {
      var curHour=0, maxHour=23, shiftMins=15, curPageItems=[];
      console.log(scope.model);
      scope.model=scope.model||0;
      var regenCurPageItems=function() {
        var items=[], i, mins, hours;
        for(i=1;i<=4;i++) {
          mins=i*shiftMins;
          hours=curHour+Math.floor(mins/60);
          mins=mins%60;
          items.push({
            mins: mins,
            hours: hours,
            value: hours*60+mins
          });
        }
        curPageItems=items;
      };
      scope.getCurPageItems=function() {
        return curPageItems;
      };
      scope.getCurHour=function() {
        return curHour;
      };
      scope.getMaxHour=function() {
        return maxHour;
      };
      scope.nextHour=function() {
        curHour=Math.min(curHour+1, maxHour);
        regenCurPageItems();
      };
      scope.prevHour=function() {
        curHour=Math.max(curHour-1, 0);
        regenCurPageItems();
      };
      scope.$watch('model', function(newVal, oldVal) {
        if(newVal) {
          curHour=Math.floor(newVal/60)-(newVal%60?0:1);
        } else {
          curHour=0;
        }
        regenCurPageItems();
      });
    }
  }
});