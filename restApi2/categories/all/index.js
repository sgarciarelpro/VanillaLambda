'use strict';

module.exports.handler = function (event, context, cb) {
    console.log('Received event:', event);
    var categories = require("lib/categories");
    console.log("Categories = ", categories);
    return cb(null, {"statusCode": 200, "body": JSON.stringify({"categories":categories.categories})});
};
