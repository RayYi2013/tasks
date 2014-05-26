/**
 * Created by ray on 2014-05-23.
 */
(function(server){
    //private
    var Q = require('q'),
        jwt = require('jwt-simple'),
        moment = require('moment'),
        tokenLifetime = 60* 2, //minutes
        tokenSecret = 'tokensecret';
    var app;

    /**
     * proxy of sling Server, simulate account api of sling server.
     * usage: require('../modules/slingServer').init(app)
     *
     * @constructor
     * @param {object} _app_ - express app object.
     */
        //usage: require('../modules/accountManager').init(app)
    function init(_app_){
        app = _app_;
    }

    function createAccount(email,password){
        return Q.fcall(function () {
            return true;
        });
    }

    function login(email,password){
        return Q.fcall(function () {
            //set expire time
            var expires = moment().add('minutes', tokenLifetime).utc().format();
            //encode token with user.id and expire time
            var token = jwt.encode(
                {
                    exp: expires
                },
                tokenSecret
            );
            return token;
        });
    }

    function logout(token){
        return Q.fcall(function () {
            return true;
        });
    }

    function verifyToken(token){
        return Q.fcall(function () {
            var decoded = jwt.decode(token, tokenSecret);
            //verify expire time
            if (moment.utc(decoded.exp).local() <= Date.now()) {
                console.log('Access token has expired');
                //throw new Error('Access token has expired');
                return false;
            }
            return true;
        });
    }


    //public interface
    server.init = init;
    server.createAccount = createAccount;
    server.login = login;
    server.logout = logout;
    server.verifyToken = verifyToken;


})(module.exports);
