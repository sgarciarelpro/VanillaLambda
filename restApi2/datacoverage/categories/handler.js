'use strict';

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var PromiseRequest = lib.PromiseRequest;
var createErrorMsg = lib.createErrorMsg;


var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

module.exports.handler = function(event, context, cb) {
  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));
  var category = event.body.categoryName;
  var queryString = "";
  if (category != undefined && category != '') {
    queryString +=  "(or (prefix field=category_name '" + category + "') ";
    queryString +=  "(prefix field=category_name '" + category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase() + "')";
    queryString +=  "(prefix field=category_name '" + category.toUpperCase() + "') ";
    queryString +=  "(prefix field=category_name '" + category.toLowerCase() + "') ";
    queryString +=  ")";

    console.log("queryString=" + queryString);

    var start = event.body.start || 0;
    var size = event.body.size || 1000;
    var searchParams = {
      query: queryString,
      queryParser: 'structured',
      //queryOptions: '{"fields":["relpro_category_id"]}',
      size: parseInt(size),
      start: parseInt(start),
      //return: 'vendor_name,product_name,category_name',
      facet: '{"category_name" : {"sort": "bucket", "size": ' + size + '}}',
      sort: 'category_name_lower asc'
    };
    domainTechStackSearch.searchAsync(searchParams).then(
        function (req) {
          if (req != undefined) {
            return {"categories": req.facets.category_name.buckets}
          } else {
            return {"categories": ""};
          }
        }
    ).then(function (data) {
      console.log("data="+ JSON.stringify(data));
      if (data) {
        return cb(null, data);
      }
    })
        .catch(function(error){
          console.error(error);
          var errorResponse = createErrorMsg(-285, "categoryCoverage");
          return cb(null, errorResponse);
        });
  } else {
    var errorResponse = createErrorMsg(-282, "categoryCoverage");
    return cb(null, errorResponse);
  }
};
