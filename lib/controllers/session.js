'use strict';

var account = require('./../modules/accountManager.js'),
    helpers = require('./../modules/helpers.js');

/**
 * Logout
 */
exports.logout = function (req, res) {
    var token = helpers.getTokenOfRequest(req);
    account.logout(token)
        .then(function(token){
            res.send(200);
        })
        .done();

};

/**
 * Login
 */
exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    account.login(email,password)
        .then(function(data){
            res.json({token:data.token.primaryToken});
        })
        .fail(function(err){
            //next(new UnauthorizedError('invalid_token', err));
            //next(err);
            res.json(404,err);

        })
        .done();
};

/**
 * Login
 */
exports.verifyToken = function (req, res, next) {
    var token = helpers.getTokenOfRequest(req);
    account.verifyToken(token)
        .then(function(data){
            res.json({token:data.token.primaryToken});
        })
        .fail(function(err){
            //next(new UnauthorizedError('invalid_token', err));
            res.json(404,err);
        })
        .done();
};