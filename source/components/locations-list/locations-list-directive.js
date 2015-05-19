'use strict';

jsChallenge.directive('jscLocationsList', function(jscLocationsSrvc, $timeout, $anchorScroll) {
  return {
    restrict: 'E',
    templateUrl: 'locations-list/locations-list-directive.html',
    link: function(scope, element) {
      var lockListScroll=false, lockTimer;

      scope.getLocations=jscLocationsSrvc.getLocations;
      scope.getSelectedLocation=jscLocationsSrvc.getSelectedLocation;

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
            var elContainer=element.find('ul')[0];
            var elActive=element[0].getElementsByClassName('active')[0];
            elContainer.scrollTop=elActive.offsetTop-Math.round((elContainer.offsetHeight-elActive.offsetHeight)/2);
          });
        }
      });

    }
  }
});