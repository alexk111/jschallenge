'use strict';

jsChallenge.service('jscInfoSrvc', function() {
  var that=this;

  var info={
    date: new Date(Date.now() + 3 * 3600 * 1000),
    time: new Date(Date.now() + 3 * 3600 * 1000),
    duration: 90
  };

  var mins=info.time.getMinutes();
  info.time.setMinutes(mins+(10-info.time.getMinutes()%10));

  this.getInfo=function() {
    return info;
  };
});