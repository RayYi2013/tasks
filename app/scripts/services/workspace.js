/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .factory('WorkspaceAPI', function ($resource) {
        return $resource('/api/workspace/');
    });
