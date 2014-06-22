'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    sling:{
        host:'centos65-ray.cloudapp.net',
        port:'8080',
        user:'admin',
        pass:'admin'
    },
    apiPath: '/api'
};