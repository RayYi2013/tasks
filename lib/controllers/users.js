'use strict';

var account = require('./../modules/accountManager.js');

/**
 * Create user
 */
exports.create = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    account.createAccount(email,password)
        .then(function(newUser) {
            return account.log(email,password);
        })
        .then(function(data){
            res.json(data.token.primaryToken);
        })
        .fail(function(err){
            //next(new UnauthorizedError('invalid_token', err));
            next(err);
        })
        .done();
};

