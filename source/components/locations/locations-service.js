'use strict';

jsChallenge.service('jscLocationsSrvc', function($http, $q) {
  var that=this,
      locations = [],
      markers = [],
      selectedLocation=undefined,
      selectedMarker=undefined,
      minsOffsets = [0, 15, -15, 30, -30],
      isLoading=false, isError=false;

  function findValueLocByID(values, id) {
    var value;
    for(var i=0, len=values.length;i<len;i++) {
      value=values[i];
      if(value.id===id) {
        return value;
      }
    }
  }

  function buildLocation(locationAPIData, minsOffset, tsFrom, duration) {
    tsFrom+=minsOffset*60*1000;

    var mDur=moment.duration(duration, 'minutes'),
        hrs=mDur.hours(), mins=mDur.minutes(), strHrs='', strMins='';

    if(hrs) {
      strHrs=hrs+(hrs>1?' hrs':' hr');
    }

    if(mins) {
      strMins=mins+(mins>1?' mins':' min');
    }

    var location={
      id: locationAPIData.id,
      code: locationAPIData.code,
      lat: locationAPIData.latitude,
      lng: locationAPIData.longitude,
      name: locationAPIData.parking_shortname,
      minsOffset: minsOffset,
      tsAvail: tsFrom,
      fmtDuration: strHrs+' '+strMins,
      fmtDate: moment(tsFrom).format('MMM D, YYYY'),
      fmtAvail: moment(tsFrom).format('h:mm A')
    };

    var marker={
      id: location.id,
      latitude: location.lat,
      longitude: location.lng,
      icon: {
        url: 'images/map-marker-'+(minsOffset?'difftime':'exacttime')+'.png',
        anchor: {
          x: 31,
          y: 41
        }
      },
      gOptions: {
        visible: true
      }
    };

    locations.push(location);
    markers.push(marker);
  }

  function buildLocations(locationsAPIData, tsFrom, duration) {
    var i,len, j, len2, minsOffset, locationAPIData;
    console.log('Result from the API calls:', locationsAPIData);

    locations=[];
    markers=[];
    selectedLocation=undefined;
    selectedMarker=undefined;

    for(i=0, len=minsOffsets.length;i<len;i++) {
      minsOffset=minsOffsets[i];
      for(j=0, len2=locationsAPIData[i].length;j<len2;j++) {
        locationAPIData=locationsAPIData[i][j];
        if(locationAPIData.cars_available && !findValueLocByID(locations, locationAPIData.id)) {
          buildLocation(locationAPIData, minsOffset, tsFrom, duration);
        }
      }
    }
  }

  function makeAllMarkersVisible() {
    for(var i=0,len=markers.length;i<len;i++) {
      markers[i].gOptions.visible=true;
    }
  }

  this.reload=function(date, time, duration) {
    isError=false;
    isLoading=true;

    var from=new Date(date);
    from.setHours(0);
    from.setMinutes(0);
    from.setSeconds(0);
    from.setMilliseconds(0);

    var tsFrom = from.getTime() + (time.getHours()*60 + time.getMinutes())*60*1000,
        tsTo = tsFrom + duration * 60 * 1000,
        url, i, len, minsOffset, locationsAPIData=[], promises=[];

    for(i=0, len=minsOffsets.length;i<len;i++) {
      minsOffset=minsOffsets[i];
      url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + (tsFrom+minsOffset*60*1000) + '&book_end=' + (tsTo+minsOffset*60*1000);
      promises.push($http.get(url));
    }

    $q.all(promises).then(function(values){
      for(i=0;i<len;i++) {
        locationsAPIData.push(values[i].data);
      }
      buildLocations(locationsAPIData, tsFrom, duration);
      isLoading=false;
    }, function(err){
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

  this.getMarkers=function() {
    return markers;
  };

  this.setSelectedId=function(id) {
    selectedLocation=findValueLocByID(locations, id);
    selectedMarker=findValueLocByID(markers, id);
    makeAllMarkersVisible();
    if(selectedMarker) {
      selectedMarker.gOptions.visible=false;
    }
  };

  this.resetSelectedId=function() {
    selectedLocation=undefined;
    selectedMarker=undefined;
    makeAllMarkersVisible();
  };

  this.getSelectedLocation=function() {
    return selectedLocation;
  };

  this.getSelectedMarker=function() {
    return selectedMarker;
  };

});