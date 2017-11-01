'use strict';

var https = require('https');
var _ = require("underscore");

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var PromiseRequest = lib.PromiseRequest;
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

  if (event.header.userToken != "" && event.header.userToken != undefined){

    var options = {
      host : host,
      port : 443,
      path : basePath + '/prospector/v1/user/data/categories/' + hgDataSourceId.toString(),
      method : 'GET',
      headers : {'userToken' : event.header.userToken}
    };
    console.log("host and basepath = " + host + basePath);
    var req = https.request(options, function(res) {

      res.setEncoding('utf-8');

      var responseString = '';
      var response;

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {

        var responseObject = JSON.parse(responseString.trim());

        if (responseObject.error) {

          if (responseObject.error.status == -300) {
            var errorResponse = createErrorMsg(-300, "SearchByIndustry");
            return cb(null, errorResponse);


          } else {
            var errorResponse = createErrorMsg(-285, "SearchByIndustry");
            return cb(null, errorResponse);

          }

        } else {

          if (_.isEmpty(responseObject.dataCategories) == false) {

            var permCategories = responseObject.dataCategories;

            if (permCategories[0].sourceId == hgDataSourceId) {

              var industry = event.body.industry;

              var queryString = "";
              if (industry != undefined && industry != '') {

                queryString += "(and (or (prefix field=zoom_industry_label_1 '" + industry + "') (prefix field=zoom_industry_label_1 '" + industry.charAt(0).toUpperCase() + industry.slice(1).toLocaleLowerCase() + "') (prefix field=zoom_industry_label_1 '" + industry.toUpperCase() + "') (prefix field=zoom_industry_label_1 '" + industry.toLowerCase() + "') )";

                if (permCategories != '' && permCategories != undefined) {
                  queryString += "(or ";
                  _.each(permCategories, function (val) {
                    queryString += "relpro_category_id:" + val.categoryId + " ";
                  }, this);
                  queryString += ") ";
                }
                queryString += ")";

                console.log("queryString=" + queryString);

                var start = event.start || 0;
                var size = event.size || 10;

                var searchParams = {
                  query: queryString,
                  queryParser: 'structured',
                  queryOptions: '{"fields":["relpro_category_id"]}',
                  size: parseInt(size),
                  start: parseInt(start),
                  facet: '{"zoom_industry_label_1" : {"sort": "bucket", "size": 5}}',
                  sort: 'zoom_industry_label_1 asc'

                };
                domainTechStackSearch.searchAsync(searchParams).then(
                    function (req) {
                      if (req == undefined) {
                        response = {
                          "message": "No industries found for assigned categories",
                          "industries": ""
                        };
                        return cb(null, response);
                      } else {
                        return req.facets.zoom_industry_label_1.buckets;
                      }
                    }
                ).then(function (data) {

                  if (data) {

                    response = {"message": "Success", "industries": data};
                    return cb(null, response);

                  } else {

                    response = {"message": "No industries found", "industries": data};
                    return cb(null, response);
                  }
                }).catch(function(){
                  var errorResponse = createErrorMsg(-285, "SearchByIndustry");
                  return cb(null, errorResponse);
                });

              } else {
                var errorResponse = createErrorMsg(-288, "SearchByIndustry");
                return cb(null, errorResponse);
              }

            } else {
              var errorResponse = createErrorMsg(-290, "SearchByIndustry");
              return cb(null, errorResponse);
            }

          } else {
            var errorResponse = createErrorMsg(-280, "SearchByIndustry");
            return cb(null, errorResponse);
          }
        }
      });
    }).on('error', function() {
      var errorResponse = createErrorMsg(-280, "SearchByIndustry");
      return cb(null, errorResponse);
    });

    req.end();

  } else {
    var errorResponse = createErrorMsg(-280, "SearchByIndustry");
    return cb(null, errorResponse);
  }

};
