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

exports.getWorkspace = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};


exports.create = function(req, res) {
    var root = req.userData.user._doc.sling.root,
        name = req.body.name,
        path = root + '/' + name;
    adapter.createNode(path, req.body)
        .then(function(res1){
            res.json(res1);
        })
};

exports.update = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};

exports.delete = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};