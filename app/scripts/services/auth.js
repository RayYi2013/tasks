'use strict';

angular.module('tasksApp')
  .factory('Auth', function Auth($location, $rootScope, Session, User, localStorageService) {
    
    // Get currentUser from cookie
    var token = localStorageService.get('token');
    if(token ){
        $rootScope.token = token;
        Session.get({},function(){
            //do nothing
        }
        ,function(err){
                localStorageService.remove('token');
                $rootScope.token = null;
            });
    }

        function saveToken(token){
            $rootScope.token = token.token;
            localStorageService.save('token', token.token);

        }
    return {

      /**
       * Authenticate user
       * 
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;

        return Session.save({
          email: user.email,
          password: user.password
        }, function(token) {
            saveToken(token);
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       * 
       * @param  {Function} callback - optional
       * @return {Promise}           
       */
      logout: function(callback) {
        var cb = callback || angular.noop;

        return Session.delete(function() {
            $rootScope.token = null;
            return cb();
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Create a new user
       * 
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(token) {
              saveToken(token);
            return cb(token);
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Change password
       * 
       * @param  {String}   oldPassword 
       * @param  {String}   newPassword 
       * @param  {Function} callback    - optional
       * @return {Promise}              
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       * 
       * @return {Object} user
       */
      token: function() {
        return $rootScope.token;
      },

      /**
       * Simple check to see if a user is logged in
       * 
       * @return {Boolean}
       */
      isLoggedIn: function() {
        var token = $rootScope.token;
          //console.log(token);
        return !!token;
      }
    };
  });