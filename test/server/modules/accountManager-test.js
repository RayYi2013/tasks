/**
 * Created by ray on 2014-05-24.
 */

var should = require('should'),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q'),
    slingServer = require('../../../lib/modules/slingServer');

// Bootstrap models
var modelsPath = path.join(__dirname, '../../../lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

var User = mongoose.model('User'),
    Token = mongoose.model('Token');

var testEmail = 'test@ss.com',
    testPassword = 'pasword';

var accountManager = require('../../../lib/modules/accountManager');
accountManager.init();



// Now we write specs using the mocha BDD api
describe('accountManager ', function() {

    beforeEach(function(done){
        User.remove({}, function(err) {
            Token.remove({}, function(err) {
                done();
            });
        });
    });

    describe('#createAccount( email, password )', function() {

        it('return promise with new user info', function( done ) { // Async test, the lone argument is the complete callback
            accountManager.createAccount(testEmail, testPassword)
                .then(function(user){
                    //mongoose.connection.close();
                    user.should.be.ok;
                    user.email.should.equal(testEmail);
                    user.password.should.equal(testPassword);
                    done();
                })
                .done();
        });


        it('throw error when create account on sling fail', function( done ) { // Async test, the lone argument is the complete callback
            //mongoose.connect('mongodb://localhost/project-db-test');

            var stub = sinon.stub(slingServer, "createAccount", function(email,password){
                return Q.fcall(function(){
                    return false;
                })
            });
            accountManager.createAccount(testEmail, testPassword)
                .fail(function(err){
                    //mongoose.connection.close();
                    err.should.be.ok;
                    should(err).have.property('message');

                    stub.restore();

                    done();
                })
                .done();
        });
    });

    describe('#login( email, password )', function() {

        it('return promise with new user info', function( done ) { // Async test, the lone argument is the complete callback
            accountManager.createAccount(testEmail, testPassword)
                .then(function(user){
                    return accountManager.login(testEmail, testPassword);
                })
                .then(function(data){
                    //mongoose.connection.close();
                    var user = data.user;
                    user.should.be.ok;
                    user.userId.should.be.ok;

                    var token = data.token;
                    token.should.be.ok;
                    token.primaryToken.should.ok;
                    token.expiryDate.should.ok;
                    token.slingToken.should.ok;
                    done();
                })
                .done();
        });


        it('throw error when find no user', function( done ) { // Async test, the lone argument is the complete callback
            accountManager.login('noemail@email.com', testPassword)
                .fail(function(err){
                    //mongoose.connection.close();
                    err.should.be.ok;
                    should(err).have.property('message');

                    done();
                })
                .done();
        });


        it('throw error when login on sling fail', function( done ) { // Async test, the lone argument is the complete callback
            var stub = sinon.stub(slingServer, "login", function(email,password){
                return Q.fcall(function(){
                    return '';
                })
            });
            accountManager.createAccount(testEmail, testPassword)
                .then(function(){
                    return accountManager.login(testEmail, testPassword);
                })
                .fail(function(err){
                    //mongoose.connection.close();
                    err.should.be.ok;
                    should(err).have.property('message');

                    stub.restore();

                    done();
                })
                .done();
        });

    });

    describe('#logout( token )', function() {

        it('return promise with deleted token info', function( done ) { // Async test, the lone argument is the complete callback
            accountManager.createAccount(testEmail, testPassword)
                .then(function(user){
                    return accountManager.login(testEmail, testPassword);
                })
                .then(function(data){
                    return accountManager.logout(data.token.primaryToken);
                })
                .then(function(token){
                    //mongoose.connection.close();
                    token.should.be.ok;
                    token.primaryToken.should.ok;
                    token.expiryDate.should.ok;
                    token.slingToken.should.ok;
                    done();
                })
                .done();
        });


        it('throw error when login out sling fail', function( done ) { // Async test, the lone argument is the complete callback
            var stub = sinon.stub(slingServer, "logout", function(email,password){
                return Q.fcall(function(){
                    return false;
                })
            });
            accountManager.createAccount(testEmail, testPassword)
                .then(function(){
                    return accountManager.login(testEmail, testPassword);
                })
                .then(function(data){
                    return accountManager.logout(data.token.primaryToken);
                })
                .then(function(token){
                    //mongoose.connection.close();
                    token.should.be.ok;
                    token.primaryToken.should.ok;
                    token.expiryDate.should.ok;
                    token.slingToken.should.ok;

                    stub.restore();
                    done();
                })
                .done();
        });

    });

    describe('#verifyToken( token )', function() {

        it('return promise with user and token info', function( done ) { // Async test, the lone argument is the complete callback
            accountManager.createAccount(testEmail, testPassword)
                .then(function(user){
                    return accountManager.login(testEmail, testPassword);
                })
                .then(function(data){
                    return accountManager.verifyToken(data.token.primaryToken);
                })
                .then(function(data){
                    //mongoose.connection.close();
                    var user = data.user;
                    user.should.be.ok;
                    user.userId.should.be.ok;

                    var token = data.token;
                    token.should.be.ok;
                    token.primaryToken.should.ok;
                    token.expiryDate.should.ok;
                    token.slingToken.should.ok;
                    done();
                })
                .done();
        });


        it.only('return promise with user with renew token info when sling.token exired', function( done ) { // Async test, the lone argument is the complete callback
            var stub = sinon.stub(slingServer, "verifyToken", function(email,password){
                return Q.fcall(function(){
                    return false;
                })
            });
            accountManager.createAccount(testEmail, testPassword)
                .then(function(){
                    return accountManager.login(testEmail, testPassword);
                })
                .then(function(data){
                    return accountManager.verifyToken(data.token.primaryToken);
                })
                .then(function(data){
                    //mongoose.connection.close();
                    var user = data.user;
                    user.should.be.ok;
                    user.userId.should.be.ok;

                    var token = data.token;
                    token.should.be.ok;
                    token.primaryToken.should.ok;
                    token.expiryDate.should.ok;
                    token.slingToken.should.ok;
                    done();
                })
                .done();
        });


    });
});