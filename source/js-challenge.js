'use strict';

var jsChallenge = angular.module('jsChallenge', [
  'ngAnimate',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
]).config(function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
});
