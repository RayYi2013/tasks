'use strict';

angular.module('tasksApp')
  .controller('SignupCtrl', function ($scope, Auth, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Auth.createUser({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(token) {
          // Account created, redirect to home
          //$location.path('workspace');
                //$rootScope.apply();
                //$state.go('root');
                $state.go('workspace');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });