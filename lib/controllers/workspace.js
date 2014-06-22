/**
 * Created by ray on 2014-06-07.
 */

var config = require('../config/config');

var adapter = require('../modules/sling/adapter.js')(config);

exports.getList = function(req, res) {
    var root = req.userData.user._doc.sling.root;
    adapter.getDescendantNodeList(root)
        .then(function(list){
//            console.log('get descendant node list');
            //data sample:
            //[{"name":"www","jcr:path":"/data/yisc_sohu_com/www","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test1","jcr:path":"/data/yisc_sohu_com/www/test1","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test2","jcr:path":"/data/yisc_sohu_com/www/test2","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test4","jcr:path":"/data/yisc_sohu_com/www/test4","jcr:score":1000,"jcr:primaryType":"sling:Folder"},
            // {"name":"test5","jcr:path":"/data/yisc_sohu_com/www/test5","jcr:score":1000,"jcr:primaryType":"sling:Folder"}]
            var a = list.map(function(key, val, array){
                key['jcr:path'] = key['jcr:path'].replace(root,'');
                return key;
            });
            res.json(a);
//            res.json(list);
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