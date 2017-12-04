'use strict';

var _ = require("underscore");
var moment = require('moment');
var config = require("config/env-config.js").config;

// Require Logic
var lib = require('lib');
var PromiseRequest = lib.PromiseRequest;
var createErrorMsg = lib.createErrorMsg;
var errorCheck = lib.errorCheck;
var hgDataSourceId = lib.hgDataSourceId;

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

var parseResult = function(uResult, dataCategories, reveals){

  var pResult = {
    "date_first_verified": "",
    "relpro_category_id":  0,
    "intensity": 0,
    "relpro_number_profiles":  0,
    "vendor_name_lower": "",
    "zoom_city": "",
    "zoom_company_name": "",
    "zoom_ref_id": "",
    "zoom_industry_label_1": "",
    "company_name": "",
    "zoom_industry_label_2": "",
    "product_name": "",
    "zoom_state": "",
    "zoom_number_employees":  0,
    "date_last_verified": "",
    "zoom_url": "",
    "zoom_revenue":  0,
    "company_name_lower": "",
    "product_name_lower": "",
    "category_name_lower": "",
    "category_name": "",
    "relpro_techsearch_id":  0,
    "url": "",
    "country": "",
    "relpro_industry_id":  0,
    "relpro_rcp_id":  0,
    "relpro_product_id": 0,
    "zoom_company_name_lower": "",
    "category_parent_name": "",
    "relpro_vendor_id": 0,
    "zoom_country": "",
    "vendor_name": ""
  };

  _.each(pResult, function(value, key){
    if(uResult.fields[key]!= undefined && uResult.fields[key].length > 0){
      if(typeof value == "string"){
        pResult[key] = uResult.fields[key][0];
      } else {
        pResult[key] = parseInt(uResult.fields[key][0]);
      }
    }
  });

  pResult.paid = false;
  pResult.reveal = true;

  return pResult;
};

module.exports.handler = function(event, context, cb) {

    console.log('EVENT = ', event);
    var stage = event.stageVariables.functionAlias;
    console.log('STAGE = ', stage);
    var host = config[stage].relProHost;
    console.log("NEW HOST = ", host);
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var techSearchEndpoint = process.env.techSearchEndpoint;
    var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

    var eventBody = JSON.parse(event.body);

  if (event.headers.userToken != "" && event.headers.userToken != undefined){

    var revealOptions = {
      host : host,
      port : 443,
      path : basePath + '/prospector/v1/contract/techSearch/data',
      method : 'GET',
      headers : {
        "userToken" : event.headers.userToken,
        "content-type": "application/json"
      }
    };

    var getRevealsRequest = PromiseRequest(revealOptions).then(function(values) {
      // console.log('getreveal value:', values);
      // console.log('getreveal values.error:', values.error);
      // console.log('getreveal values.body:', values.body["remainingReveals"]);

      if (values.error != undefined) {
        var errResponse = errorCheck(values, "revealDetails");
          return cb(null, {"statusCode": 400, "body": JSON.stringify(errResponse)});
      }
      var remainingReveals = 0;
      if (values.body.remainingReveals != undefined) {
        remainingReveals = values.body.remainingReveals;
        console.log("remainingReveals=" + remainingReveals);

      }
      return values;

    }).then(function(values){


      var dataCategories = values.body.dataCategories;
      var reveals = values.body.reveals;
      var remainingReveals = values.body.remainingReveals;


      if (remainingReveals > 0) {

            var techSearchDocumentId = event.techSearchDocumentId;

            var queryString = "";
            if (techSearchDocumentId != undefined && techSearchDocumentId != '') {

              queryString += "(and relpro_techsearch_id:" + techSearchDocumentId + " ";

              queryString += ")";

              var start = event.start || 0;
              var size = event.size || 10;

              var searchParams = {
                query: queryString,
                queryParser: 'structured',
                //queryOptions: '{"fields":["relpro_category_id"]}',
                size: parseInt(size),
                start: parseInt(start),
                sort: 'company_name asc'
              };

              domainTechStackSearch.searchAsync(searchParams).then(
                  function (req) {
                    if (req != undefined) {
                      console.log('5a');
                      return req.hits;
                    } else {
                      console.log('5b');
                      var errorResponse = createErrorMsg(-300, "CompanySearch");
                      return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
                    }
                  }
              ).then(function (data) {
                console.log(JSON.stringify(data))
                var response = "";
                if (data) {
                  if(data.hit.length > 0){
                    console.log('dataCategories = ' + JSON.stringify(dataCategories));
                    console.log('reveals = ' + JSON.stringify(reveals));
                    response =  parseResult(data.hit[0], dataCategories, reveals);

                    var companyName = response.zoom_company_name != "" ? response.zoom_company_name : response.company_name;

                    var body = {
                      category: {
                        sourceId: 75,
                        categoryName: response.category_name,
                        categoryId: response.relpro_category_id
                      },
                      sourceId: 27,
                      refId: response.zoom_ref_id,
                      documentId: response.relpro_techsearch_id.toString(),
                      url: response.url,
                      companyName: companyName
                    };


                    var createRevealOptions = {
                      host : host,
                      port : 443,
                      path : basePath + '/prospector/v1/user/data/reveal',
                      method : 'POST',
                      headers: {
                        "content-type": "application/json",
                        "userToken" : event.headers.userToken
                      }
                    };

                    console.log("body=" + JSON.stringify(body) + "\n\r");

                    var remainingReveals = 0;
                    var createRevealsRequest = PromiseRequest(createRevealOptions, body).then(function(values) {

                      console.log("values=" + JSON.stringify(values.body.error) + "\n\r");
                      if (values.body.error != undefined) {
                        var errorResponse = createErrorMsg(values.body.error.status, "RevealDetails");
                        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});

                      } else {
                        response.remainingReveals = values.body.remainingReveals;
                          return cb(null, {"statusCode": 200, "body":JSON.stringify(response)});
                      }
                    });

                  } else {
                    var errorResponse = {
                      "error": {
                        "message": "No company found",
                        "page": "",
                        "pageSize": "",
                        "company": "",
                        "found": "0",
                        "method": "CompanyReveal",
                        "status": 0
                      }
                    };
                      return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
                  }
                } else {
                  console.log('6b');
                  var errorResponse = createErrorMsg(-200, "CompanySearch");
                  return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
                }

              }).catch(function(e) {
                console.error(e);
                var errorResponse = createErrorMsg(-285, "RevealDetails");
                return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
              });

            } else {
              var errorResponse = createErrorMsg(-287, "RevealDetails");
              return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
            }



      } else {

        var errorResponse = createErrorMsg(-283, "RevealDetails");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});

      }

    });

  } else {
    var errorResponse = createErrorMsg(-300, "RevealDetails");
    return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
  }
};
