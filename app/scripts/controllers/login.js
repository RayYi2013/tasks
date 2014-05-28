'use strict';

angular.module('tasksApp')
  .controller('LoginCtrl', function ($scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
                $state.go('root.workspace');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });