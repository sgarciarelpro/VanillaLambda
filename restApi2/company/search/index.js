'use strict';

var _ = require("underscore");

// Require Logic
var lib = require('lib');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;
var hgDataSourceId = lib.hgDataSourceId;
var buildTechSearchQuery = lib.buildTechSearchQuery;

var config = require("config/env-config.js").config;

console.log(JSON.stringify(buildTechSearchQuery));

var parseResult = function (uResult, dataCategories, reveals) {
    var paid = false;
    var isReveal = false;
    if (dataCategories.length > 0) {
        var paid = _.any(dataCategories, function (dc) {
            return parseInt(uResult.fields.relpro_category_id[0]) == dc.categoryId && dc.categoryType == 1;
        });
    }

    if (!paid && reveals.length > 0) {
        isReveal = _.any(reveals, function (reveal) {
            return (reveal.url == uResult.fields.url[0] || reveal.company_name == uResult.fields.company_name[0] || (uResult.fields.zoom_company_name != undefined && reveal.company_name == uResult.fields.zoom_company_name[0]))
                && (uResult.fields.relpro_category_id[0] == reveal.category.categoryId);
        });
    }

    var pResult = {};
    if (paid || isReveal) {
        var pResult = {
            "date_first_verified": "",
            "relpro_category_id": 0,
            "intensity": 0,
            "relpro_number_profiles": 0,
            "vendor_name_lower": "",
            "zoom_city": "",
            "zoom_company_name": "",
            "zoom_ref_id": "",
            "zoom_industry_label_1": "",
            "company_name": "",
            "zoom_industry_label_2": "",
            "product_name": "",
            "zoom_state": "",
            "zoom_number_employees": 0,
            "date_last_verified": "",
            "zoom_url": "",
            "zoom_revenue": 0,
            "company_name_lower": "",
            "product_name_lower": "",
            "category_name_lower": "",
            "category_name": "",
            "relpro_techsearch_id": 0,
            "url": "",
            "country": "",
            "relpro_industry_id": 0,
            "relpro_rcp_id": 0,
            "relpro_product_id": 0,
            "zoom_company_name_lower": "",
            "category_parent_name": "",
            "relpro_vendor_id": 0,
            "zoom_country": "",
            "vendor_name": ""
        };
    } else {
        var pResult = {
            "date_first_verified": "",
            "relpro_category_id": 0,
            "intensity": 0,
            "vendor_name_lower": "",
            "product_name": "",
            "date_last_verified": "",
            "product_name_lower": "",
            "category_name_lower": "",
            "category_name": "",
            "relpro_techsearch_id": 0,
            "country": "",
            "relpro_industry_id": 0,
            "relpro_product_id": 0,
            "category_parent_name": "",
            "relpro_vendor_id": 0,
            "zoom_country": "",
            "zoom_state": "",
            "vendor_name": ""
        };
    }
    _.each(pResult, function (value, key) {
        if (uResult.fields[key] != undefined && uResult.fields[key].length > 0) {
            if (typeof value == "string") {
                pResult[key] = uResult.fields[key][0];
            } else {
                pResult[key] = parseInt(uResult.fields[key][0]);
            }
        }
    });

    pResult.paid = paid;
    pResult.reveal = isReveal;

    return pResult;
}

module.exports.handler = function (event, context, cb) {
    console.log("EVENT = ", event);
    var eBody = JSON.parse(event.body);

    var stage = event.stageVariables.functionAlias;
    var host = config[stage].relProHost;
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var techSearchEndpoint = config[stage].techSearchEndpoint;
    var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

    console.log('1');
    var userToken = event.headers.userToken;
    if (userToken != undefined && userToken != null && userToken != "") {
        console.log('2');
        var dataCategoryOptions = {
            host: host,
            port: 443,
            path: basePath + '/prospector/v1/contract/techSearch/data',
            method: 'GET',
            headers: {'userToken': event.headers.userToken},
            logResponse: false
        };
        var getRevealsRequest = PromiseRequest(dataCategoryOptions, null)
            .then(function (values) {
                console.log('3a');
                console.log("Values = ", JSON.stringify(values));
                if (values.body.error == undefined) {
                    console.log('4a');
                    var paid = false;

                    var dataCategories = values.body.dataCategories;
                    var reveals = values.body.reveals;
                    var categoryId = eBody.categoryId;
                    var vendorId = eBody.vendorId;
                    var productId = eBody.productId;
                    var company = eBody.company;
                    var domain = eBody.domain;
                    var city = eBody.city;
                    var state = eBody.state;
                    var country = eBody.country;
                    var minEmployee = eBody.minEmployee;
                    var maxEmployee = eBody.maxEmployee;
                    var minRevenue = eBody.minRevenue * 1000;
                    var maxRevenue = eBody.maxRevenue * 1000;
                    var relProIndustries = eBody.relProIndustries;

                    var page = eBody.page || 1;
                    var pageSize = eBody.pageSize || 10;
                    var start = (page - 1) * pageSize;

                    var sortOrder = eBody.sortOrder || "";
                    var sortField = eBody.sortField || "";

                    console.log("State in search index = ", state);
                    var searchParams = buildTechSearchQuery(event, values);


                    console.log('cloudsearchParams=' + JSON.stringify(searchParams));
                    console.log("domainTechStackSearch = ", domainTechStackSearch);
                    domainTechStackSearch.searchAsync(searchParams).then(
                        function (req) {
                            if (req != undefined) {
                                console.log('5a');
                                console.log("req = ", req);
                                return req.hits;
                            } else {
                                console.log('5b');
                                var errorResponse = createErrorMsg(-300, "CompanySearch");
                                return cb(null, errorResponse);
                            }
                        }
                    ).then(function (data) {
                            var response = "";
                            if (data) {
                                console.log('6a');
                                var results = [];
                                console.log('dataCategories = ' + JSON.stringify(dataCategories));
                                console.log('reveals = ' + JSON.stringify(reveals));
                                console.log("data = ", data);
                                _.each(data.hit, function (result) {
                                    results.push(parseResult(result, dataCategories, reveals));
                                }, this);

                                var categoryDetail = {};
                                var vendor_id = 0;
                                var vendor_name = "";

                                if (results.length > 0) {
                                    var rCatId = results[0].relpro_category_id;
                                    var categories = require("lib/categories");
                                    categoryDetail = categories.categoryDetails(rCatId);
                                    vendor_id = results[0].relpro_vendor_id;
                                    vendor_name = results[0].vendor_name;
                                }

                                response = {
                                    "total": data.found,
                                    pageSize: parseInt(pageSize),
                                    page: page, "results": results, categoryDetails: categoryDetail,
                                    vendor_id: vendor_id,
                                    vendor_name: vendor_name
                                };

                                return cb(null, {"statusCode": 200, "body":JSON.stringify(response)});
                            } else {
                                console.log('6b');
                                var errorResponse = createErrorMsg(-200, "CompanySearch");
                                return cb(null, {"statusCode": 400, "body":JSON.stringify(errorResponse)});
                            }
                        }
                    ).catch(function (error) {
                        console.log("6c");
                        console.error(error);
                        var errorResponse = createErrorMsg(-200, "CompanySearch");
                        return cb(null, {"statusCode": 400, "body":JSON.stringify(errorResponse)});
                    });
                } else {
                    console.log('4b');
                    return cb(null, {"statusCode": 200, "body": JSON.stringify(values.body)});
                }
            })
            .catch(function (error) {
                console.log("3b");
                console.error(error);
                cb(null, {"statusCode": 400, "body":JSON.stringify(error)});
            });
    } else {
        var errorResponse = createErrorMsg(-200, "CompanySearch");
        return cb(null, {"statusCode": 400, "body":JSON.stringify(errorResponse)});
    }
}

