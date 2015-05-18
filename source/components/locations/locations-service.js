'use strict';

jsChallenge.service('jscLocationsSrvc', function($http) {
  var that=this,
      locations = [],
      isLoading=false, isError=false;

  this.reload=function(date, time, duration) {
    isError=false;
    isLoading=true;

    var start = date.getTime() + (time.getHours()*60 + time.getMinutes())*1000;
    var end = start + duration * 60 * 1000;
    var url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + start + '&book_end=' + end;

    $http.get(url).success(function(result) {
      console.log('Result from the API call:', result);
      isLoading=false;
    }).error(function(err) {
      // Hum, this is odd ... contact us...
      console.error(err);
      isLoading=false;
      isError=true;
    });
  };

  this.isLoading=function() {
    return isLoading;
  };

  this.isError=function() {
    return isError;
  };

  this.getLocations=function() {
    return locations;
  };

});