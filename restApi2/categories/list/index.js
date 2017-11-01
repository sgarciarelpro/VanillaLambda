'use strict';

module.exports.handler = function(event, context, cb) {
  var categories = require("lib/categories");
  console.log('Received event:', event);
  var response = {"message": "Success", "categories": categories.subCategories()};
  return cb(null, {"body": JSON.stringify(response), "statusCode": 200});
};
