/**
 * Created by ray on 2014-05-20.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var TokenSchema = new Schema({
    token: String,
    expireTime: String
});


/**
 * Validations
 */

// Validate empty token
TokenSchema
    .path('token')
    .validate(function(token) {
        return token.length;
    }, 'token cannot be blank');





module.exports = mongoose.model('Token', TokenSchema);
