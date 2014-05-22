'use strict';

angular.module('tasksApp')
  .factory('Session', function ($resource) {
    return $resource('/authenticate/');
  });
