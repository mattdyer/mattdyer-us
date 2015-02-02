'use strict';

angular.module('myApp.projects', ['ngRoute','myApp.projects.life'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl'
  });
}])

.controller('ProjectsCtrl', [function() {

}]);