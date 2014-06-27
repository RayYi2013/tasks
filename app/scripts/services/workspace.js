/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .factory('WorkspaceAPIResource', function ($resource) {
        return $resource('/api/workspace/', {}, { query: { isArray: false }});
    });
