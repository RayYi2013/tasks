/**
 * Created by RYi on 6/30/2014.
 */


/**
 * Created by ray on 2014-06-07.
 */

var config = require('../config/config');

var adapter = require('../modules/sling/adapter.js')(config);

exports.create = function(req, res) {
    var root = req.userData.user._doc.sling.root,
        p_name = req.params.p_name,
        name = req.body.name,
        path = root + '/' + p_name + '/Models/' + adapter.normalizeNodeName(name);
    adapter.createNode(path, req.body) //create project
        .then(function(res1){  //create data sets
            res.json(res1);
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
