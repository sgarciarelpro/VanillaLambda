'use strict';

var _ = require("underscore");
var https = require('https');

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var createErrorMsg = lib.createErrorMsg;
var hgDataSourceId = lib.hgDataSourceId;

var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

module.exports.handler = function(event, context, cb) {

  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));

  if (event.header.userToken != "" || event.header.userToken != undefined){

    var options = {
      host : host,
      port : 443,
      path : basePath + '/prospector/v1/user/data/categories/' + hgDataSourceId.toString(),
      method : 'GET',
      headers : {'userToken' : event.header.userToken}
    };
    var req = https.request(options, function(res) {

      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {

        var responseObject = JSON.parse(responseString.trim());
        var response;

        if (responseObject.error) {

          if (responseObject.error.status == -300) {
            var errorResponse = createErrorMsg(-300, "ProductsByCategory");
            return cb(null, errorResponse);

          } else {
            var errorResponse = createErrorMsg(-285, "ProductsByCategory");
            return cb(null, errorResponse);
          }

        } else {

          console.log("responseObject=" + JSON.stringify(responseObject));
          var permCategories = responseObject.dataCategories;

          if (permCategories[0].sourceId == hgDataSourceId) {

            var queryString = "";
            if (permCategories != '' && permCategories != undefined) {
              queryString += "(or ";
              _.each(permCategories, function (val) {
                queryString += "relpro_category_id:" + val.categoryId + " ";
              }, this);
              queryString += ") ";
            }
            console.log("queryString=" + queryString);

            var start = event.start || 0;
            var size = event.size || 10;

            var searchParams = {
              query: queryString,
              queryParser: 'structured',
              queryOptions: '{"fields":["relpro_category_id"]}',
              size: parseInt(size),
              start: parseInt(start),
              facet: '{"product_name" : {"sort": "bucket", "size": 1000}}',
              sort: 'product_name asc'

            };
            domainTechStackSearch.searchAsync(searchParams).then(
                function (req) {
                  if (req != undefined) {
                    return req.facets.product_name.buckets;
                  } else {
                    var response = {"message": "No products found for assigned categories", "products": ""};
                    return cb(null, response);

                  }
                }
            ).then(function (data) {

              if (data) {

                response = {"message": "Success", "products": data};
                return cb(null, response);

              } else {

                response = {"message": "No products found", "products": data};
                return cb(null, response);
              }
            });

            //}

          } else {

            var errorResponse = createErrorMsg(-280, "ProductsByCategory");
            return cb(null, errorResponse);

          }
        }
      });
    }).on('error', function() {

      var errorResponse = createErrorMsg(-280, "ProductsByCategory");
      return cb(null, errorResponse);

    });

    req.end();

  } else {
    var errorResponse = createErrorMsg(-300, "ProductsByCategory");
    return cb(null, errorResponse);
  }
};