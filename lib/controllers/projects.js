/**
 * Created by ray on 2014-06-07.
 */

var config = require('../config/config');

var adapter = require('../modules/sling/adapter.js')(config);

exports.getList = function(req, res) {
    var root = req.userData.user._doc.sling.root;
    adapter.getDescendantNodeList(root)
        .then(function(list){

            res.json(list);
        })
        .done();
};


exports.create = function(req, res) {
    var root = req.userData.user._doc.sling.root,
        name = req.body.name,
        path = root + '/' + adapter.normalizeNodeName(name),
        result = null;
    adapter.createNode(path, req.body) //create project
        .then(function(res1){  //create data sets
            result = res1;
            return adapter.createNode(path + '/DataSets', {
                name:'Data Sets',
                type: 'datesets'
            });
        })
        .then(function(res1){ //create tools
            return adapter.createNode(path + '/Tools', {
                name:'Tools',
                type: 'tools'
            });
        })
        .then(function(res1){
            return adapter.createNode(path + '/Models', {
                name:'Models',
                type: 'models'
            });
        })
        .then(function(res1){  //create data sets
            res.json(result);
        });

};


exports.update = function(req, res) {
    var result = {name:req.params.name};
    return res.json(result);
};

exports.delete = function(req, res) {
    var result = {name:req.params.name};
    return res.json(result);
};