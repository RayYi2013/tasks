/**
 * Created by RYi on 5/28/2014.
 */
'use strict';

angular.module('tasksApp')
    .controller('WorkspaceMenuCtrl', function ($scope, User, WorkspaceList) {
        $scope.list = WorkspaceList;

        $scope.onClickMenu = function(evt, workspaceId){

        }
    });
