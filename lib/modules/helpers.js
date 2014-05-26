/**
 * Created by ray on 2014-05-25.
 */
var UnauthorizedError = require('./UnauthorizedError');
var account = require('./account-manager.js');

module.exports.getTokenOfRequest = function(req) {

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0]
                , credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                return credentials;
            }
        }
    }
};
