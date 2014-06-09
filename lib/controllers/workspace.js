/**
 * Created by ray on 2014-06-07.
 */


exports.getList = function(req, res) {
    var workspaceList = [{name:'vancouver', id:1},{name:'richmond', id:2}];
    return res.json(workspaceList);
};

exports.getWorkspace = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};


exports.create = function(req, res) {
    var result = {id:1};
    return res.json(result);
};

exports.update = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};

exports.delete = function(req, res) {
    var result = {id:req.params.id};
    return res.json(result);
};