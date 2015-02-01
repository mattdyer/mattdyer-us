'use strict';

angular.module('myApp.copyrightyear.copyrightyear-directive', [])

.directive('appCopyrightyear', ['copyrightyear', function(copyrightyear) {
  return function(scope, elm, attrs) {
    elm.text(copyrightyear);
  };
}]);