'use strict';

module.exports.handler = function(event, context, cb) {
  var industries = require("../../lib/industries");
  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));
  var response = {"message": "Success", "industries": industries.industryLabels};
  return cb(null, response);
};
