/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceCtrl', function ($scope, $state, ProjectList,AppHelpers) {
        $scope.projectList = AppHelpers.generateProjectTree(ProjectList);
//        $scope.projectList = ProjectList
    });
