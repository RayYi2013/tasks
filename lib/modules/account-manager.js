/**
 * Created by ray on 2014-05-14.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jwt-simple'),
    moment = require('moment');

var secret = 'jwtTokenSecret';

exports.createAccount = function(user, cb) {
    var newUser = new User(user);
    newUser.provider = 'local';
    newUser.save(function(err) {
        cb(err, newUser);
    });
};

exports.validateAccount = function(email, password, cb) {
    User.findOne({
        email: email.toLowerCase()
    }, function(err, user) {
        if (err) return cb(err);

        if (!user) {
            return cb({
                message: 'This email is not registered.'
            });
        }
        if (!user.authenticate(password)) {
            return cb({
                message: 'This password is not correct.'
            });
        }
        return cb(null, user);
    });
};


exports.createToken = function(user, cb) {
    var expires = moment().add('minutes', 60).valueOf();
    var token = jwt.encode(
        {
            iss: user.id,
            exp: expires
        },
        secret
    );
    cb(null, token);
};


exports.validateToken = function(token, cb) {
    var decoded = jwt.decode(token, secret)

    if (decoded.exp <= Date.now()) {
        console.log('Access token has expired');
        //cb({message:'Access token has expired'});
        cb(null,false);
        return;
    }

    User.findOne({ '_id': decoded.iss }, '-salt -hashedPassword', function(err, user){

        if (!err) {
            cb(null, user);
        }
        else{ cb(err); }
    })
};