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
            return account.login(email,password);
        })
        .then(function(data){
            res.json(data.token.primaryToken);
        })
        .fail(function(err){
            res.json(409,err);
        })
        .done();
};

