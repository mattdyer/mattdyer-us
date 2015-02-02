'use strict';

angular.module('myApp.projects.life', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/life', {
    templateUrl: 'projects/life/life.html',
    controller: 'ProjectLifeCtrl'
  });
}])

.controller('ProjectLifeCtrl', [function() {

	

}]);