/**
 * Created by RYi on 6/9/2014.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceItemCtrl', function ($scope, $stateParams) {

        $scope.label = $stateParams.label;
    });
