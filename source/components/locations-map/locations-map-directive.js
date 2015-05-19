'use strict';

jsChallenge.directive('jscLocationsMap', function(jscLocationsSrvc, $timeout ,$modal) {
  return {
    restrict: 'E',
    templateUrl: 'locations-map/locations-map-directive.html',
    link: function(scope, element) {
      var lockMapReposition=false, lockTimer;
      scope.map = { center: { latitude: 1.3, longitude: 103.8 }, zoom: 15 };
      scope.getSelectedMarker=jscLocationsSrvc.getSelectedMarker;
      scope.getSelectedLocation=jscLocationsSrvc.getSelectedLocation;
      scope.getMarkers=jscLocationsSrvc.getMarkers;
      scope.windowCoords={latitude: 0, longitude: 0};
      scope.windowOptions={
        boxClass: 'jsc-locations-map-info-window',
        alignBottom: true,
        closeBoxURL: ''
      };
      scope.markerControl={};

      scope.$watch('getSelectedMarker()',function(newVal, oldVal){
        if(newVal===oldVal) return;
        var marker;
        if(newVal) {
          scope.windowCoords={
            latitude: newVal.latitude,
            longitude: newVal.longitude
          };
          if(!lockMapReposition) {
            scope.map.center.latitude=newVal.latitude;
            scope.map.center.longitude=newVal.longitude;
          }
          if(scope.markerControl) {
            marker=scope.markerControl.getChildMarkers().get(newVal.id);
            marker.updateModel(newVal);
          }
        }
        if(oldVal) {
          if(scope.markerControl) {
            marker=scope.markerControl.getChildMarkers().get(oldVal.id);
            marker.updateModel(oldVal);
          }
        }
      });

      var onMarkerClick = function(marker, evtName, model, args) {
        $timeout.cancel(lockTimer);
        lockMapReposition=true;
        jscLocationsSrvc.setSelectedId(model.id);
        lockTimer=$timeout(function(){
          lockMapReposition=false;
        },100);
      };
      scope.markerEvents={
        'click': onMarkerClick
      };

      var onMapClick=function(maps, evtName, args) {
        scope.$apply(function(){
          jscLocationsSrvc.resetSelectedId();
        });
      };
      scope.mapEvents={
        'click': onMapClick
      };


      scope.onWindowCloseClick = function() {
        jscLocationsSrvc.resetSelectedId();
      };

      scope.onBookClick = function() {
        $modal.open({
          templateUrl: 'modals/booked/booked-view.html',
          controller: 'modalBookedCtrl'
        });
      };
    }
  }
});