/**
 * Created by RYi on 5/28/2014.
 */

/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceListCtrl', function ($scope, User, $state) {

        var num = 1;
        function getNum() {
            return num++;
        }

        $scope.treedata=createSubTree(0);
        function createSubTree(level) {
            if (level > 0)
                return [
                    { "label" : "Node " + getNum(), "id" : "id", "children": createSubTree(level-1) },
                    { "label" : "Node " + getNum(), "id" : "id", "children": createSubTree(level-1) },
                    { "label" : "Node " + getNum(), "id" : "id", "children": createSubTree(level-1) },
                    { "label" : "Node " + getNum(), "id" : "id", "children": createSubTree(level-1) }
                ];
            else
                return [];
        }

        var selectedScope;
        $scope.showSelected = function(scope) {
            $scope.selected = scope.selectedNode.label;
            selectedScope  = scope;
//            alert('select node');
        };

        $scope.addRoot = function() {
//            alert('add root');
            $scope.treedata.push({ "label" : "New Node " + getNum(), "id" : "id", "children": [] });
        };
        $scope.addChild = function() {
//            $scope.treedata[0].children.push({ "label" : "New Node " + getNum(), "id" : "id", "children": [] });
            $scope.node1.children.push({ "label" : "New Node " + getNum(), "id" : "id", "children": [] });
            selectedScope.selectNodeHead();
        };
    });
