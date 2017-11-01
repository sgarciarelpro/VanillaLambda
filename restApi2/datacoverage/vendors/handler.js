'use strict';

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var createErrorMsg = lib.createErrorMsg;

var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

module.exports.handler = function(event, context, cb) {
  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));
  var vendor = event.body.vendorName;
  var queryString = "";

  if (vendor != undefined && vendor != '') {
    queryString += "(or(prefix field='vendor_name_lower' '" + vendor.toLowerCase() + "') vendor_name_lower:'" + vendor.toLowerCase() + "') ";

    console.log("queryString=" + queryString);

    var start = event.body.start || 0;
    var size = event.body.size || 10000;
    var searchParams = {
      query: queryString,
      queryParser: 'structured',
      size: parseInt(size),
      start: parseInt(start),
      facet: '{"vendor_name" : {"sort": "bucket", "size": ' + size + '}}',
      sort: 'vendor_name_lower asc'
    };

    console.log("searchParams=" + JSON.stringify(searchParams));
    domainTechStackSearch.searchAsync(searchParams).then(
        function (req) {
          if (req != undefined) {
            return {"vendors": req.facets.vendor_name.buckets}
          } else {
            return {"vendors": ""};
          }
        }
    ).then(function (data) {
      console.log("data="+ JSON.stringify(data));
      if (data) {
        return cb(null, data);
      }
    })
        .catch(function(){
          var errorResponse = createErrorMsg(-285, "vendorCoverage");
          return cb(null, errorResponse);
        });
  } else {
    var errorResponse = createErrorMsg(-282, "vendorCoverage");
    return cb(null, errorResponse);
  }
};
