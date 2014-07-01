/**
 * Created by RYi on 6/10/2014.
 */
var fs = require("fs");
var path = require("path");
var util = require("util");
var q = require('q');

/**
 * Remove the trailing slash from a URL path.
 * @param  {String} path The path to be normalized.
 * @return {String} The normalized path.
 */
function removeTrailingSlash(path) {
    if (path === "/") {
        return path;
    }

    if (path.slice(-1) === "/") {
        return path.slice(0, -1);
    }

    return path;
}

/**
 * Normalize properties to be sent to Sling via the POST Servlet. In
 * particular, for each array property, make sure that a "@TypeHint" exists to
 * create a JCR multi-value property on the server.
 * @param  {Object} properties Properties to be normalized.
 * @return {Object} Normalized properties.
 */
function normalizeProperties(properties) {
    var arrays = Object.keys(properties).filter(function (name) {
        return util.isArray(properties[name]);
    });

    var typeHints = arrays.map(function (name) {
        return name + "@TypeHint";
    });

    typeHints.forEach(function (typeHint) {
        if (!properties[typeHint]) {
            properties[typeHint] = "String[]";
        }
    });

    return properties;
}


/**
 * Append a property to the form. Ensures that property values and multi-value
 * properties are converted in the correct way.
 * @param  {Object} form Form to append the properties to.
 * @param  {String} name Name of the property.
 * @param  {Object} value Value of the property.
 * @param  {Object} [options] property for form element is optional
 */
function appendProperty(form, name, value, options) {
    if (util.isArray(value)) {
        value.forEach(function (value) {
            form.append(name, value);
        });
    }
    else if (typeof value === "boolean") {
        form.append(name, value ? "true" : "false");
    }
    else {
        form.append(name, value, options);
    }
}


/**
 * Return the URL for a given path. The URL will have a correct protocol, host
 * and port.
 * @param  {String} path Path to be added to the URL.
 * @return {String} A full URL targeting the given path on the configured
 *     Sling instance.
 */
var getUrl = function (path) {
    var _this = exports;

    var config =_this.config;
    return "http://" + config.sling.host + ":" + config.sling.port + path;
};

/**
 * Create an authorization object to authorize the request.
 * @return {Object} Authorization object.
 */
var getAuth = function () {
    var _this = exports;

    var config =_this.config;
    return {
        user: config.sling.user,
        pass: config.sling.pass
    };
};

/**
 * Create default options to add to each reqest. Default options include the
 * URL to post to, "Accept" header to always request a JSON response, proxy
 * configuration and authorization informtion.
 * @param  {String} path Path to send the request to.
 * @return {Object} Options to be added to each request.
 */
var getDefaultOptions = function (path) {
    return {
        url: getUrl(removeTrailingSlash(path)),
        headers: { "Accept": "application/json" },
//        proxy: process.env.http_proxy,
        auth: getAuth()
    };
};

/**
 * create response callback to handle defer.
 * @param  {Object} defer, defer object.
 * @return {function} callback function for request..
 */
function responseCallback(defer){
    return function(error, res, body){
        if(error) {
            return defer.reject(error);
        }

        if(res.statusCode === 200){  //for get and update.
            return defer.resolve(JSON.parse(body));
        } else if(res.statusCode === 201){  //201 Created, for create action
            return defer.resolve(JSON.parse(body));
        } else if(res.statusCode === 204){ // 204 No Content, for delete action
            return defer.resolve({'status.code':204});
        } else {
            return defer.reject(new Error('error: '+ res.statusCode));
        }
    };
}


/**
 * Create a node in the Sling instance.
 * @param  {String}   path Path of the node to create.
 * @param  {Object}   properties Properties of the node.

 * @returns {Object} return promise. if resolve, with response body.
 */
var createNode = function (path, properties) {
    var _this = exports;
    var defer = q.defer();

    // Create the request
    var req = _this.request.post(getDefaultOptions(path), responseCallback(defer));

    // Add request properties

    properties = normalizeProperties(properties);
    properties["jcr:primaryType"] = "nt:unstructured";
    // Add form only if fields must be submitted

    var names = Object.keys(properties);

    if (names.length === 0) {
        return;
    }

    var form = req.form();

    names.forEach(function (name) {
        appendProperty(form, name, properties[name]);
    });

    req.setHeader('Content-Length', form.getLengthSync(false));

    return defer.promise;
};

/**
 * Create a node in the Sling instance.
 * the url is like: http://centos65-ray.cloudapp.net:8080/data/yisc_sohu_com/www/test1.json
 * @param  {String}   path Path of the node to create. like: /data/yisc_sohu_com/www/test1

 * @returns {Object} return promise. if resolve, with response body.
 */
var getNode = function (path) {
    var _this = exports;
    var defer = q.defer();
    var opt = getDefaultOptions(path + '.json');
    //opt.url = opt.url + '.json';

    // Create the request
    var req = _this.request.get(opt, responseCallback(defer));
    return defer.promise;
};

/**
 * Create a node in the Sling instance.
 * the query use url like: http://centos65-ray.cloudapp.net:8080/data/yisc_sohu_com.tidy.infinity.json
 * response: array, like below.
 * [{"name":"www","jcr:path":"/data/yisc_sohu_com/www","jcr:score":1000,"jcr:primaryType":"sling:Folder"},{"name":"test1","jcr:path":"/data/yisc_sohu_com/www/test1","jcr:score":1000,"jcr:primaryType":"sling:Folder"},{"name":"test2","jcr:path":"/data/yisc_sohu_com/www/test2","jcr:score":1000,"jcr:primaryType":"sling:Folder"},{"name":"test4","jcr:path":"/data/yisc_sohu_com/www/test4","jcr:score":1000,"jcr:primaryType":"sling:Folder"},{"name":"test5","jcr:path":"/data/yisc_sohu_com/www/test5","jcr:score":1000,"jcr:primaryType":"sling:Folder"}]
 * @param  {String}   path Path of the node to create. like: /data/yisc_sohu_com

 * @returns {Object} return promise. if resolve, with response body.
 */
var getDescendantNodeList = function (path) {
    var _this = exports;
    var defer = q.defer();
    var opt = getDefaultOptions(path + '.infinity.json');

    // Create the request
    var req = _this.request.get(opt, responseCallback(defer));
    return defer.promise;
};


/**
 * Create a node in the Sling instance.
 * @param  {String}   path Path of the node to create.

 * @returns {Object} return promise. if resolve, with response body.
 */
var deleteNode = function (path) {
    var _this = exports;
    var defer = q.defer();
    var url = getDefaultOptions(path);

    // Create the request
    var req = _this.request.del(url, responseCallback(defer));
    return defer.promise;
};


var normalizeNodeName = function(name){
    return name.replace(/[^\w]/gi, '_');
};

/**
 * Creates the module for move account repository api
 * @constructor
 * @param {Object} config - global config, defined in server.js.
 *   example: config = {
    sling:{
        host:'',
        port:'',
        user:'',
        pass:''
    }
         } ;
 * @param {Object} injected - it include:
 *      logger

 * @returns {Object} return module implemented interface.
 */
module.exports = function (config, injected) {
    var _this = exports;

    _this.config = config;
    _this.injected = injected;
    _this.request = require('request');

    _this.createNode = createNode;
    _this.getNode = getNode;
    _this.deleteNode = deleteNode;
    _this.getDescendantNodeList = getDescendantNodeList;
    _this.normalizeNodeName = normalizeNodeName;
    return _this;
};

