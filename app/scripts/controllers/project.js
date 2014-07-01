/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('ProjectCtrl', function ($scope, $state, ProjectList) {
        //$scope.projectList = AppHelpers.generateProjectTree(ProjectList);
        $scope.projectList = ProjectList
    });
