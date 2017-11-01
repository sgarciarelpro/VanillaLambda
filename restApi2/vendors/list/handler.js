'use strict';

module.exports.handler = function(event, context, cb) {
  var vendors = require("../../lib/vendors");
  console.log(JSON.stringify(vendors));
  return cb(null, vendors);
};
