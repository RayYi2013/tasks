/**
 * Created by RYi on 5/28/2014.
 */

/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceListCtrl', function ($scope,  $state, WorkspaceAPIResource) {
        var tree;
        $scope.my_data = $scope.projectList;

        $scope.my_tree = tree = {};

        $scope.try_adding_a_branch = function() {
            var b;
            b = tree.get_selected_branch();
            b = tree.add_branch(b, {
                label: 'New Branch',
                data: {
                    something: 42,
                    "else": 43
                }
            });
            return tree.select_branch(b);
        };

        $scope.$on('new-project', function(event, args) {
            var b;
            b = tree.add_branch(null,args);
        });

        $scope.add_project = function() {
            return tree.add_branch(null, {
                label: 'New Branch',
                data: {
                    something: 42,
                    "else": 43
                }
            });
        };


        $scope.my_tree_handler = function(branch) {
            var _ref;
            $scope.output = "You selected: " + branch.label;
            if ((_ref = branch.data) != null ? _ref.description : void 0) {
                return $scope.output += '(' + branch.data.description + ')';
            }
            $state.go('workspace.item',{label:branch.label});
        };


    });
