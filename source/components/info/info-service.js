'use strict';

jsChallenge.service('jscInfoSrvc', function(constInitialBookFromNow, constAllowedBookFromNow) {
  var that=this;

  var info={
    date: new Date(Date.now() + constInitialBookFromNow),
    time: new Date(Date.now() + constInitialBookFromNow),
    duration: 90
  };

  var mins=info.time.getMinutes();
  mins+=(10-info.time.getMinutes()%10);
  info.time.setMinutes(mins);
  info.date.setMinutes(mins);

  this.getInfo=function() {
    return info;
  };

  this.getDateTime=function() {
    var dt=new Date(info.date);
    dt.setHours(info.time.getHours());
    dt.setMinutes(info.time.getMinutes());
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  };
  this.isDateTimeValid=function() {
    return(this.getDateTime()>(new Date(Date.now() + constAllowedBookFromNow)));
  };
});