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
    primaryToken: String,
    expiryDate: String,
    slingToken: String
});


/**
 * Validations
 */

// Validate empty token
TokenSchema
    .path('primaryToken')
    .validate(function(primaryToken) {
        return primaryToken.length;
    }, 'token cannot be blank');





module.exports = mongoose.model('Token', TokenSchema);
