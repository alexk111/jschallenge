'use strict';

jsChallenge.directive('jscLocationsMap', function() {
  return {
    restrict: 'E',
    templateUrl: 'locations-map/locations-map-directive.html',
    link: function(scope, element) {
      scope.map = { center: { latitude: 1.3, longitude: 103.8 }, zoom: 14 };
    }
  }
});