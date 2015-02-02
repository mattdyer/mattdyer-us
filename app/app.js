'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.about',
  'myApp.projects',
  'myApp.projects.life',
  'myApp.projects.life.lifegame',
  'myApp.version',
  'myApp.copyrightyear'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
