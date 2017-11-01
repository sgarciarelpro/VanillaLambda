'use strict';

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var products = require('../../lib/products');
var createErrorMsg = lib.createErrorMsg;

var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

module.exports.handler = function(event, context, cb) {
  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));
  var product = event.body.productName;

  return cb(null, {"products": products.filterProducts(product)});

  /*var queryString = "";

  if (product != undefined && product != '') {
    queryString += "(or(prefix field='product_name_lower' '" + product.toLowerCase() + "') product_name_lower:'" + product.toLowerCase() + "') ";
  } else {
    queryString += "matchall";
  }

    console.log("queryString=" + queryString);

    var start = event.body.start || 0;
    var size = event.body.size || 10000;
    var searchParams = {
      query: queryString,
      queryParser: 'structured',
      size: parseInt(size),
      start: parseInt(start),
      facet: '{"product_name" : {"sort": "bucket", "size": ' + size + '}}',
      sort: 'product_name_lower asc'
    };


    console.log("searchParams=" + JSON.stringify(searchParams));
    domainTechStackSearch.searchAsync(searchParams).then(
        function (req) {
          if (req != undefined) {
            return {"products": req.facets.product_name.buckets}
          } else {
            return {"products": ""};
          }
        }
    ).then(function (data) {
      console.log("data="+ JSON.stringify(data));
      if (data) {
        return cb(null, data);
      }
    })
        .catch(function(){
          var errorResponse = createErrorMsg(-285, "productCoverage");
          return cb(null, errorResponse);
        });*/

};
