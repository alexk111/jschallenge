'use strict';

jsChallenge.directive('jscLocationsList', function(jscLocationsSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'locations-list/locations-list-directive.html',
    link: function(scope, element) {
      scope.getLocations=jscLocationsSrvc.getLocations;

      scope.clickLocation=function(location) {
        console.info('Location Clicked:', location);
      };
    }
  }
});