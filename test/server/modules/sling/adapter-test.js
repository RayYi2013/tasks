/**
 * Created by RYi on 6/11/2014.
 */
/**
 * Created by ray on 2014-05-24.
 */

var should = require('should'),
    sinon = require('sinon');

var config = {
    sling:{
        host:'centos65-ray.cloudapp.net',
        port:'8080',
        user:'admin',
        pass:'admin'
    }
};

var adapter = require('../../../../lib/modules/sling/adapter.js')(config);

// Now we write specs using the mocha BDD api
describe('sling adapter ', function() {
    var testPath = '/data/yisc_sohu_com/www/test6';

    describe('#createNode then get', function() {

        it('return promise with response', function( done ) { // Async test, the lone argument is the complete callback
            var prop = {
                name: 'test',
                color: 'red'
            }
            adapter.createNode(testPath,prop)
                .then(function(res){
                    res.should.be.ok;
                    should(res).have.property('status.code');
                    res['status.code'].should.equal(200);
                    return adapter.getNode(testPath);
//                    done();

                })
                .then(function(res){
                    res.should.be.ok;
                    should(res).have.property('jcr:createdBy');
                    res['jcr:createdBy'].should.equal('admin');
                    res['name'].should.equal('test');
                    return adapter.getDescendantNodeList(testPath);
                })
                .then(function(res){
                    res.should.be.ok;
                    should(res).have.property('jcr:createdBy');
                    res['jcr:createdBy'].should.equal('admin');
                    res['name'].should.equal('test');
                })
                .fail(function(err){
                    true.should.not.be.ok;
                })
                .fin(function(){
                    setTimeout(function(){
                        adapter.deleteNode(testPath)
                            .then(function(res){
                                res.should.be.ok;
                                should(res).have.property('status.code');
                                res['status.code'].should.equal(204);
                            })
                            .fail(function(err){
                                true.should.not.be.ok;
                            })
                            .fin(function(){
                                done();
                            });

                    }, 1000);
                });

        });


    });



});