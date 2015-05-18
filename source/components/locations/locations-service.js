'use strict';

jsChallenge.service('jscLocationsSrvc', function($http, $q) {
  var that=this,
      locations = [],
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

  function buildLocation(valueLoc, tsFrom) {
    locations.push({
      id: valueLoc.id,
      code: valueLoc.code,
      lat: valueLoc.latitude,
      lng: valueLoc.longitude,
      name: valueLoc.parking_shortname,
      tsAvail: tsFrom
    });
  }

  function buildLocations(values, tsFrom) {
    var i,len, valueLoc, valueLocA, id;
    console.log('Result from the API calls:', values);

    locations=[];
    for(i=0, len=values[2].data.length;i<len;i++) {
      valueLoc=values[2].data[i];
      valueLocA=valueLoc;
      if(!valueLocA.cars_available) {
        console.info('(Offset 0) No Avail Cars for: ', valueLoc);
        id=valueLoc.id;
        valueLocA=findValueLocByID(values[1].data,id);
        if(!valueLocA || !valueLocA.cars_available) {
          console.info('(Offset -15) No Avail Cars for: ', valueLoc);
          valueLocA=findValueLocByID(values[3].data,id);
          if(!valueLocA || !valueLocA.cars_available) {
            console.info('(Offset +15) No Avail Cars for: ', valueLoc);
            valueLocA=findValueLocByID(values[0].data,id);
            if(!valueLocA || !valueLocA.cars_available) {
              console.info('(Offset -30) No Avail Cars for: ', valueLoc);
              valueLocA=findValueLocByID(values[4].data,id);
              if(!valueLocA || !valueLocA.cars_available) {
                console.info('(Offset +30) No Avail Cars for: ', valueLoc);
                buildLocation(valueLoc, undefined);
              } else {
                buildLocation(valueLoc, tsFrom+30*60*1000);
              }
            } else {
              buildLocation(valueLoc, tsFrom-30*60*1000);
            }
          } else {
            buildLocation(valueLoc, tsFrom+15*60*1000);
          }
        } else {
          buildLocation(valueLoc, tsFrom-15*60*1000);
        }
      } else {
        buildLocation(valueLoc, tsFrom);
      }
    }

  }

  this.reload=function(date, time, duration) {
    isError=false;
    isLoading=true;

    var tsFrom = date.getTime() + (time.getHours()*60 + time.getMinutes())*1000,
        tsTo = tsFrom + duration * 60 * 1000,
        url, i, promises=[];

    for(i=-30*60*1000;i<=30*60*1000;i+=15*60*1000) {
      url = 'http://jschallenge.smove.sg/provider/1/availability?book_start=' + (tsFrom+i) + '&book_end=' + (tsTo+i);
      promises.push($http.get(url));
    }

    $q.all(promises).then(function(values){
      buildLocations(values, tsFrom);
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

});