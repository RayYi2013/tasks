/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .factory('ProjectAPIResource', function ($resource) {
        return $resource('/api/projects/', {}, { query: { isArray: false }});
    });
