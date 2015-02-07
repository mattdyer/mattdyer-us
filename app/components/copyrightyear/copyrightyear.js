'use strict';

angular.module('myApp.copyrightyear', [
  'myApp.copyrightyear.copyrightyear-directive'
])

.value('copyrightyear', new Date().getFullYear());
