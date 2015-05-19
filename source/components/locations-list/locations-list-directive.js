'use strict';

jsChallenge.directive('jscLocationsList', function(jscLocationsSrvc, $timeout, $anchorScroll) {
  return {
    restrict: 'E',
    templateUrl: 'locations-list/locations-list-directive.html',
    link: function(scope, element) {
      var lockListScroll=false, lockTimer;

      scope.getLocations=jscLocationsSrvc.getLocations;
      scope.getSelectedLocation=jscLocationsSrvc.getSelectedLocation;

      var elContainer=element.find('ul')[0];

      /* Animation Layer */
      var reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame,
          cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame,
          rafId;
      var aniEasing=function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
      var aniScroll=function(to, duration) {
        var startPos = elContainer.scrollTop,
            diff = to - startPos,
            startTime;
        cancelAnimFrame(rafId);

        var rafTick=function(timePassed) {
          if(!startTime) {
            startTime=timePassed;
          }
          var progress=Math.min((timePassed-startTime)/duration,1);

          elContainer.scrollTop = startPos+diff*aniEasing(progress);

          if(progress<1) {
            rafId=reqAnimFrame(rafTick);
          }
        };
        rafId=reqAnimFrame(rafTick);
      };

      scope.clickLocation=function(location) {
        $timeout.cancel(lockTimer);
        lockListScroll=true;
        jscLocationsSrvc.setSelectedId(location.id);
        lockTimer=$timeout(function(){
          lockListScroll=false;
        },100);

      };

      scope.$watch('getSelectedLocation()',function(newVal, oldVal){
        if(!newVal || newVal===oldVal) return;
        if(!lockListScroll) {
          $timeout(function(){
            var elActive=element[0].getElementsByClassName('active')[0];
            var to=elActive.offsetTop-Math.round((elContainer.offsetHeight-elActive.offsetHeight)/2);
            to=Math.max(to,0);
            to=Math.min(to,elContainer.scrollHeight-elContainer.offsetHeight);
            aniScroll(to, 1000);
          });
        }
      });

    }
  }
});