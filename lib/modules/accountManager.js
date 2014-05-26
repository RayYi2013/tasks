/**
 * Created by ray on 2014-05-23.
 */
(function(manager){
    //help modules
    var mongoose = require('mongoose'),
        User = mongoose.model('User'),
        Token = mongoose.model('Token'),
        slingServer = require('./slingServer'),
        jwt = require('jwt-simple'),
        moment = require('moment'),
        Q = require('q');

    //private variables
    var app,
        slingPrefixEmail='sling',
        slingPassword = 'password',
        tokenLifetime = 60* 2, //minutes
        tokenSecret = 'tokensecret';

    /**
     * usage: require('../modules/accountManager').init(app)
     *
     * @constructor
     * @param {object} _app_ - express app object.
     */
    //usage: require('../modules/accountManager').init(app)
    function init(_app_){
        app = _app_;
        slingServer.init(app);
    }

    function generateToken(user){
        //set expire time
        var expires = moment().add('minutes', tokenLifetime).utc().format();
        //encode token with user.id and expire time
        var newToken = new Token();
        newToken.primaryToken = jwt.encode(
            {
                userId: user.userId,
                expiryDate: expires
            },
            tokenSecret
        );
        newToken.expiryDate = expires;

        return newToken;
    }

    //decode token, and verify its expira-date
    function decodeToken(primaryToken){
        var decoded = jwt.decode(primaryToken, tokenSecret);
        //verify expire time
        if (moment.utc(decoded.exp).local() < Date.now()) {
            //console.log('Access token has expired');
            throw new Error('Access token has expired');
        }
        return decoded;
    }

    /**
     * create account on Sling with random email and password,
     * and create account in Users collection in our system with sling.email and sling.password
     * return promise with user information, include sling.email and sling.password.
     *
     * @param {string} email - email from UI
     * @param {string} password - password from UI.
     *
     * @return {object} promise object, if resolved, pass user information. otherwise throw error.
     */
    function createAccount(email, password){
        //generate fake email and password
        var sling = { email:slingPrefixEmail + email, password:slingPassword};

        //register on Sling server
        return slingServer.createAccount(sling.email,sling.pasword)
            .then(function(state){
                var deferred = Q.defer();
                if(state){
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = password;
                    newUser.sling = sling;
                    //save in User collection
                    newUser.save(function(err){
                        if(err){ deferred.reject(err);}
                        else{ deferred.resolve(newUser);}
                    });
                }
                else{
                    deferred.reject(new Error('can not create account on Sling'));
                }
                return deferred.promise;
            });
    }

    /**
     * create token for user, and also login on Sling to get slingToken
     * save them in Token collection.
     * return promise with part user information with primary token.
     *
     * @param {object} user - user information from User collection
     *
     * @return {object} promise object, if resolved, pass part user and token information.
     */
    function createToken(user){
        //login on sling server to get slingToken
        return slingServer.login(user.sling.email,user.sling.pasword)
            .then(function(slingToken){
                var deferred = Q.defer();
                if(slingToken){
                    //generate token
                    var newToken = generateToken(user);

                    //save in Token collection
                    newToken.slingToken = slingToken;
                    newToken.save(function(err){
                        if(err){ deferred.reject(err);}
                        else{ deferred.resolve({user:user, token:newToken});}
                    });
                }
                else{
                    deferred.reject(new Error('can not login on Sling'));
                }
                return deferred.promise;
            });
    }

    /**
     * find user in User collection by using email and password
     * return promise with user information, include sling.email and sling.password.
     *
     * @param {string} email - email from UI
     * @param {string} password - password from UI.
     *
     * @return {object} promise object, if resolved, pass user information. otherwise throw error.
     */
    function verifyUser(email, password){
        //find on User collection
        var deferred = Q.defer();
        User.findOne({email:email.toLowerCase()},
            function(err, user){

                if (err) return deferred.reject(err);

                if (!user) {
                    return deferred.reject(new Error('this is an error'));
                }
                if (!user.authenticate(password)) {
                    return deferred.reject(new Error('This password is not correct'));
                }
                return deferred.resolve(user);
        });
        return deferred.promise;
    }

    /**
     * find user in User collection by using email and password
     * return promise with user information, include sling.email and sling.password.
     *
     * @param {string} id - user id
     *
     * @return {object} promise object, if resolved, pass user information. otherwise throw error.
     */
    function findUser(id){
        //find on User collection
        return Q.ninvoke(User, 'findOne',{_id:id});
    }

    /**
     * find token in Token collection by using primaryToken
     * return promise with token information.
     *
     * @param {string} token - primary token
     *
     * @return {object} promise object, if resolved, pass user information. otherwise throw error.
     */
    function findToken(primaryToken){
        //find on User collection
        return Q.ninvoke(Token, 'findOne',{primaryToken:primaryToken});
    }

    /**
     * remove token from Token collection,
     * also logout on Sling by using slingToken.
     * return promise with part user information with primary token.
     *
     * @param {string} primaryToken - primary token in Token collection
     *
     * @return {object} promise object, if resolved, pass nothing.
     */
    function logout(primaryToken){
        var _token;
        //find token information in Token collection
        return findToken(primaryToken)
            .then(function(token){
                _token = token;
                //logout on Sling
                return slingServer.logout(token.slingToken);
            })
            .then(function(state){
                if(state){
                    console.log('logout from sling server fail.');
                }

                var deferred = Q.defer();
                //remove it from Token collection
                _token.remove(function(err){
                    if(err){ deferred.reject(err);}
                    else{ deferred.resolve(_token);}
                })
                return deferred.promise;
            });
    }

    /**
     * login with email and password
     *
     * @param {string} email - email from UI
     * @param {string} password - password from UI.
     *
     * @return {object} promise object, if resolved, pass part user and token information.
     */
    function login(email, password){
        //find user in User collection
        return verifyUser(email,password)
            .then(function(user){
                //create token
                return createToken(user);
            });
    }

    /**
     * find token information in Token collection
     * then decode token to get user.id and expiry-date, verify expiry-date
     * then find user in User collection
     * then verify slingToken on Sling
     * if slingToken expires, need login on Sling then save new slingToken.
     *
     * @param {string} primaryToken - primary token in Token collection
     *
     * @return {object} promise object, if resolved, pass part user and token information.
     */
    function verifyToken(primaryToken){
        var _token, _user;
        //find token information in Token collection
        return findToken(primaryToken)
            .then(function(token){
                _token = token;
                //decode token to get user.id and expiry-date, verify expiry-date
                var decode = decodeToken(primaryToken);
                //find user in User collection
                return findUser(decode.userId);
            })
            .then(function(user){
                _user = user;
                //verify slingToken on Sling
                return slingServer.verifyToken(_token.primaryToken);
            })
            .then(function(status){
                if(status){
                    return {user:_user, token:_token};
                }

                return createToken(_user);
            });


    }

    //public interface
    manager.init = init;
    manager.createAccount = createAccount;
    manager.login = login;
    manager.logout = logout;
    manager.verifyToken = verifyToken;


})(module.exports);

