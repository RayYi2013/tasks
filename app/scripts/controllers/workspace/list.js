/**
 * Created by RYi on 5/28/2014.
 */

/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceListCtrl', function ($scope, User, $state) {

        //temporary node
        $scope.temporaryNode = {
            children: []
        };

        //test tree model
        $scope.roleList = [
            { label : "User", id : "role1", children : [
                { label : "subUser1", id : "role11", children : [] },
                { label : "subUser2", id : "role12", children : [
                    { label : "subUser2-1", id : "role121", children : [
                        { label : "subUser2-1-1", id : "role1211", children : [] },
                        { label : "subUser2-1-2", id : "role1212", children : [] }
                    ]}
                ]}
            ]},

            { label : "Admin", id : "role2", children : [] },

            { label : "Guest", id : "role3", children : [] }
        ];

        $scope.done = function () {
            /* reset */
            $scope.mytree.currentNode.selected = undefined;
            $scope.mytree.currentNode = undefined;
            $scope.mode = undefined;
        };

        $scope.addChildDone = function () {
            /* add child */
            if( $scope.temporaryNode.id && $scope.temporaryNode.label ) {
                $scope.mytree.currentNode.children.push( angular.copy($scope.temporaryNode) );
            }

            /* reset */
            $scope.temporaryNode.id = "";
            $scope.temporaryNode.label = "";

            $scope.done();
        };

        $scope.$watch( 'mytree.currentNode', function( newObj, oldObj ) {
            if( $scope.mytree && angular.isObject($scope.mytree.currentNode) ) {
                console.log( 'Node Selected!!' );
                console.log( $scope.mytree.currentNode );
                $state.go('user.item');
            }
        }, false);

    });
