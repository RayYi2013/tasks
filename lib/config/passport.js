'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    account = require('../modules/account-manager.js');

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
    account.createToken(user,function(err, token){
        if(!err){
            done(null,token);
        }
    });
});
passport.deserializeUser(function(token, done) {
    account.validateToken(token,function(err,user){
        done(err, user);
    });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
      account.validateAccount(email, password, function(err,user){
          if(err){ return done(null, false, err);}
          return done(null, user);
      });
  }
));

module.exports = passport;
