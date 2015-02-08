'use strict';

angular.module('myApp.projects.fish', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/fish', {
    templateUrl: 'projects/fish/fish.html',
    controller: 'ProjectFishCtrl'
  });
}])

.controller('ProjectFishCtrl', [function() {

	

}]);