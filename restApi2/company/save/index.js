'use strict';

var _ = require("underscore");
var mysql = require('mysql');

// Require Logic
var lib = require('../../lib');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;
var hgDataSourceId = lib.hgDataSourceId;
var buildTechSearchQuery = lib.buildTechSearchQuery;

console.log(JSON.stringify(buildTechSearchQuery));

var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

module.exports.handler = function(event, context, cb)  {
  console.log('1');
  var userToken = event.header.userToken;
  if (userToken != undefined && userToken != null && userToken != "") {
    console.log('2');
    var dataCategoryOptions = {
      host: host,
      port: 443,
      path: basePath + '/prospector/v1/contract/techSearch/data',
      method: 'GET',
      headers: {'userToken': event.header.userToken},
      logResponse: false
    };
    var getRevealsRequest = PromiseRequest(dataCategoryOptions, null)
        .then(function (values){
          console.log('3a');
          console.log(JSON.stringify(values));
          if(values.body.error == undefined) {
            console.log('4a');

            event.body.pageSize = event.body.maxResults;

            var searchParams = buildTechSearchQuery(event, values);
            console.log('cloudsearchParams=' + JSON.stringify(searchParams));

            var techSearchOptions = {
              host: host,
              port: 443,
              path: basePath + '/prospector/v1/techSearch/results',
              method: 'POST',
              headers: {
                  'userToken': event.header.userToken,
                  "content-type": "application/json"
              },
              logResponse: false
            };

            var body = {
                "query": searchParams.query,
                "sort": searchParams.sort,
                "start": searchParams.start,
                "contactType": event.body.contactType,
                "size": event.body.maxResults,
                "destListId": event.body.destListId
            };

            console.log('techSearchOptions=' + JSON.stringify(techSearchOptions));
            console.log('body=' + JSON.stringify(body));

            var getRevealsRequest = PromiseRequest(techSearchOptions, body)
                .then(function (values){
                    console.log('5a');
                    return cb(null, values.body);
                })
                .catch(function(error) {
                  console.log("5b");
                  console.error(error);
                  cb(null, response);
                });

          } else {
            console.log('4b');
            return cb(null, values.body);
          }
        })
        .catch(function(error) {
          console.log("3b");
          console.error(error);
          cb(null, response);
        });
  } else {
    var errorResponse = createErrorMsg(-200, "CompanySearch");
    return cb(null, errorResponse);
  }
}

