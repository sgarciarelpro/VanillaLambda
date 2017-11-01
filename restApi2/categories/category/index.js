'use strict';

// Require Logic
var lib = require('lib');

var createErrorMsg = lib.createErrorMsg;

module.exports.handler = function (event, context, cb) {
    console.log('Received event:', event);
    console.log(JSON.stringify(event, null, ' '));
    var response;
    if (event.queryStringParameters != null && event.queryStringParameters != '') {
        if (event.queryStringParameters.categoryId != "") {
            var categories = require("lib/categories");
            var categoryDetail = categories.categoryDetails(event.queryStringParameters.categoryId);
            console.log(JSON.stringify(categoryDetail));
            response = categoryDetail;
            return cb(null, {"body": JSON.stringify(response), "statusCode": 200});

        } else {
            var errorResponse = createErrorMsg(-289, "GetCategory");
            return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
        }
    } else {
        var errorResponse = createErrorMsg(-289, "GetCategory");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};
