'use strict';

var _ = require('underscore');

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

var getTechDetails = function(event, cb, categories) {

  var sourceId = event.body.sourceId || "";
  var refId = event.body.refId || "";

  var hgCategoriesFound = categories;

  if (hgCategoriesFound != undefined) {

    var queryString = "";
    queryString += "(and zoom_ref_id:'" + refId + "' ";

    if (categories != '' && categories != undefined) {
      queryString += "(or ";
      _.each(categories, function (val) {
        queryString += "relpro_category_id:" + val + " ";
      }, this);
      queryString += ") ";
    } else {
      var errorResponse = createErrorMsg(-280, "GetTechDetails");
      return cb(null,  errorResponse);
    }
    queryString += ")";

    var searchParams = {
      query: queryString,
      queryParser: 'structured',
      //queryOptions: '',
      size: 1000,
      start: 0,
      sort: 'category_name asc,vendor_name asc, product_name asc'
    };

    console.log("searchParam=" + JSON.stringify(searchParams));

    domainTechStackSearch.searchAsync(searchParams).then(function (req) {

      console.log("CloudSearch Results Received   TotalFound=" + req.hits.found + " NumResultsReturned=" + req.hits.hit.length);
      var hits = [];
      var found = 0;


      req.hits.hit.forEach(function(hit) {

        var refId = "";
        if (hit.fields.zoom_ref_id != undefined) {
          refId = hit.fields["zoom_ref_id"][0];
        }

        hits = req.hits;

      });

      var results;

      if ( _.isEmpty(hits)){
        var errorResponse = createErrorMsg(-284, "GetTechDetails");
        results = {error: errorResponse.error, found:found, start:req.hits.start, products:[]};
      } else {
        results = {error: "", found:found, start:req.hits.start, products:hits};
      }

      console.log("results=" + JSON.stringify(results, null, 4));
      return results;


    }).then(function(data){

      if (data != undefined) {
        console.log("data=" + JSON.stringify(data));
        return cb(null, data);

      }

    }).catch(function(response){
      if (response != undefined) {
        return cb(null, response);
      } else {
        var errorResponse = createErrorMsg(-285, "domainBySource");
        return cb(null, errorResponse);
      }

    });

  } else {
    var errorResponse = createErrorMsg(-290, "GetTechDetails");
    return cb(null, errorResponse);
  }
};

var headers ={};

var useAuth = function(authValue, type, event, cb){
    headers[type] = authValue;
    var dataCategoryOptions = {
        host: host,
        port: 443,
        path: basePath + '/prospector/v1/contract/techSearch/data',
        method: 'GET',
        headers: headers,
        logResponse: false
    };
    var getRevealsRequest = PromiseRequest(dataCategoryOptions, null)
        .then(function (values){
            console.log('2a');
            console.log(JSON.stringify(values));
            if(values.body.error == undefined) {
                console.log('3a');

                var validCategoryIds = [];
                _.each(values.body.dataCategories, function(dc){
                    if(dc.category_type == 1){
                        validCategoryIds.push(dc.category_id);
                    }
                }, this);
                console.log('4');

                _.each(values.body.reveals, function(reveal){
                    if(reveal.refId == event.body.refId && reveal.sourceId == event.body.sourceId){
                        validCategoryIds.push(reveal.category.categoryId);
                    }
                }, this);
                console.log('5');

                getTechDetails(event, cb, validCategoryIds);


            } else {
                console.log('3b');
                cb(null, values);
            }
        })
        .catch(function(error) {
            console.log("2b");
            console.error(error);
            cb(null, response);
        });
};

module.exports.handler = function(event, context, cb) {

  console.log('Received event:');
  console.log(JSON.stringify(event, null, ' '));

  var userToken = event.header.userToken;
  var bearer = event.header.Authorization;

  if (bearer != undefined && bearer != ""){
      useAuth(bearer, "Authorization", event, cb);
  } else if(userToken != undefined && userToken != ""){
      useAuth(userToken, "userToken", event, cb);
  } else {
    var errorResponse = createErrorMsg(-300, "domainBySource");
    return cb(null, errorResponse);
  }
};

