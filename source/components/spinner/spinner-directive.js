jsChallenge.directive('jscSpinner', function($animate) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'spinner/spinner-directive.html',
    link: function(scope, element) {
      $animate.enabled(false, element);
    }
  }
});