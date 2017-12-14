'use strict';

var _ = require('underscore');

// Require Serverless ENV vars
//var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

var config = require("config/env-config.js").config;

// Require Logic
var lib = require('lib');
var PromiseRequest = lib.PromiseRequest;
var createErrorMsg = lib.createErrorMsg;


var hgDataSourceId = lib.hgDataSourceId;

var getTechDetails = function (event, cb, categories, domainTechStackSearch) {
    var eBody = JSON.parse(event.body);
    var sourceId = eBody.sourceId || "";
    var refId = eBody.refId || "";

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
            var errorResponse = createErrorMsg(-284, "GetTechDetails");
            return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
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
            console.log('a');
            var hits = [];
            var found = 0;

            req.hits.hit.forEach(function (hit) {

                var refId = "";
                if (hit.fields.zoom_ref_id != undefined) {
                    refId = hit.fields["zoom_ref_id"][0];
                }

                hits = req.hits.hit;

            });

            var results;

            if (hits.length == 0) {
                var errorResponse = createErrorMsg(-284, "GetTechDetails");
                results = {error: errorResponse.error, found: hits.length, start: req.hits.start, products: []};
            } else {
                console.log('b');
                results = {error: "", found: hits.length, start: req.hits.start, products: hits};
            }

            console.log("results=" + JSON.stringify(results, null, 4));
            return results;


        }).then(function (data) {

            if (data != undefined) {
                console.log("data=" + JSON.stringify(data));
                return cb(null, {"statusCode": 200, "body":JSON.stringify(data)});
            }

        }).catch(function (response) {
            if (response != undefined) {
                return cb(null, response);
            } else {
                var errorResponse = createErrorMsg(-285, "domainBySource");
                return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
            }

        });

    } else {
        var errorResponse = createErrorMsg(-290, "GetTechDetails");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};

var headers = {};

var useAuth = function (authValue, type, event, host, basePath, domainTechStackSearch, cb) {
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
        .then(function (values) {
            console.log('2a');
            console.log(JSON.stringify(values));
            if (values.body.error == undefined) {
                console.log('3a');
                var eBody = JSON.parse(event.body);

                console.log("dataCategories=" + JSON.stringify(values.body.dataCategories))

                var validCategoryIds = [];
                _.each(values.body.dataCategories, function (dc) {
                    if (dc.categoryType == 1) {
                        validCategoryIds.push(dc.categoryId);
                    }
                }, this);

                console.log('4');

                _.each(values.body.reveals, function (reveal) {
                    if (reveal.refId == eBody.refId && reveal.sourceId == eBody.sourceId) {
                        validCategoryIds.push(reveal.category.categoryId);
                    }
                }, this);
                console.log('5');

                console.log(JSON.stringify(validCategoryIds))

                getTechDetails(event, cb, validCategoryIds, domainTechStackSearch);


            } else {
                console.log('3b');
                return cb(null, {"statusCode": 200, "body": JSON.stringify(values)});
            }
        })
        .catch(function (error) {
            console.log("2b");
            console.error(error);
            return cb(null, {"statusCode": 400, "body": JSON.stringify(error)});
        });
};


module.exports.handler = function (event, context, cb) {

    console.log('Received event:');
    console.log(JSON.stringify(event, null, ' '));

    console.log('EVENT = ', event);
    var stage = event.stageVariables.functionAlias;
    console.log('STAGE = ', stage);
    var host = config[stage].relProHost;
    console.log("NEW HOST = ", host);
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var techSearchEndpoint = config[stage].techSearchEndpoint;
    var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

    var userToken = event.headers.userToken;
    var bearer = event.headers.Authorization;

    if (bearer != undefined && bearer != "") {
        useAuth(bearer, "Authorization", event, host, basePath, domainTechStackSearch, cb);
    } else if (userToken != undefined && userToken != "") {
        useAuth(userToken, "userToken", event, host, basePath, domainTechStackSearch, cb);
    } else {
        var errorResponse = createErrorMsg(-300, "domainBySource");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};

