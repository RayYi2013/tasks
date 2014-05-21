/**
 * Created by ray on 2014-05-14.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Token = mongoose.model('Token'),
    jwt = require('jwt-simple'),
    moment = require('moment');

var secret = 'jwtTokenSecret';

exports.createAccount = function(user) {
    var newUser = new User(user);
    return newUser.save().exec().then(function(){
        return newUser;
    });
};

exports.validateAccount = function(email, password) {
    return User.findONe({}).exec().then(function(err,user){
        if (err) throw err;

        if (!user) {
            throw {
                message: 'This email is not registered.'
            };
        }
        if (!user.authenticate(password)) {
            throw {
                message: 'This password is not correct.'
            };
        }
        return user;
    });
//    User.findOne({
//        email: email.toLowerCase()
//    }, function(err, user) {
//        if (err) return cb(err);
//
//        if (!user) {
//            return cb({
//                message: 'This email is not registered.'
//            });
//        }
//        if (!user.authenticate(password)) {
//            return cb({
//                message: 'This password is not correct.'
//            });
//        }
//        return cb(null, user);
//    });
};


exports.createToken = function(user) {
    //set expire time
    var expires = moment().add('minutes', 60).utc().format();
    //encode token with user.id and expire time
    var token = jwt.encode(
        {
            iss: user.userId,
            exp: expires
        },
        secret
    );
    //save in db
    var newToken = new Token();
    newToken.token = token;
    newToken.expireTime = expires;
    return newToken.save().exec().then(function(){
        return newToken;
    });
};


exports.validateToken = function(token) {
    //find in Token collection
    Token.findOne({ 'token': token}).exec()
        .then(function(token){

            var decoded = jwt.decode(token, secret);
            //verify expire time
            if (moment.utc(decoded.exp).local() <= Date.now()) {
                console.log('Access token has expired');
                throw {message:'Access token has expired'};
            }
            //verify userId
            return User.findOne({ 'userId': decoded.iss }, '-salt -hashedPassword').exec();

        });

//    Token.findOne({ 'token': token}, function(err, token){
//
//        if (!err) {
//            var decoded = jwt.decode(token, secret);
//            //verify expire time
//            if (moment.utc(decoded.exp).local() <= Date.now()) {
//                console.log('Access token has expired');
//                //cb({message:'Access token has expired'});
//                cb(null,false);
//                return;
//            }
//            //verify userId
//            User.findOne({ 'userId': decoded.iss }, '-salt -hashedPassword', function(err, user){
//
//                if (!err) {
//                    cb(null, user);
//                }
//                else{ cb(err); }
//            });
//
//        }
//        else{ cb(err); }
//    });


};