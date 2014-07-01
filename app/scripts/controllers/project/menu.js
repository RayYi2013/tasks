/**
 * Created by RYi on 5/28/2014.
 */
'use strict';

angular.module('tasksApp')
    .controller('WorkspaceMenuCtrl', function ($scope, WorkspaceList, $state) {
        $scope.list = WorkspaceList;

        $scope.onClickMenu = function(evt, workspaceId){
            $state.go('workspace.item', {id:1});
        }
    });
