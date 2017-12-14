'use strict';

var AWS = require('aws-sdk');
var Promise = require("bluebird");
var https = require('https');
var querystring = require('querystring');
var _ = require('underscore');


var stopWordsLib = require('./stopwords');

module.exports.hgDataSourceId = 75;

module.exports.PromiseRequestPostForm = Promise.method(function(options, body) {
    return new Promise(function(resolve, reject) {
        var request = https.request(options, function(response) {
            // Bundle the result
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
                'error': response.error
            };
            response.setEncoding('utf-8');
            var responseString = "";

            // Build the body
            response.on('data', function(chunk) {
                responseString += chunk;
            });

            // Resolve the promise when the response ends
            response.on('end', function() {
                result.body = JSON.parse(responseString.trim());
                resolve(result);
            });
            response.on('error', function(error) {
                console.log('Problem with response:', error.message);
                reject(error);
            });

        });

        // Handle errors
        request.on('error', function(error) {
            console.log('Problem with request:', error.message);
            reject(error);
        });

        if (body != undefined) {
            request.write(body);
        }

        // Must always call .end() even if there is no data being written to the request body
        request.end();
    }, body);
});

module.exports.buildTechSearchQuery = function(event, values){
    console.log("event=" + JSON.stringify(event));
    var paid = false;

    var dataCategories = values.body.dataCategories;
    var reveals = values.body.reveals;
    var categoryId = event.body.categoryId;
    var vendorId = event.body.vendorId;
    var productId = event.body.productId;
    var company = event.body.company;
    var domain = event.body.domain;
    var city = event.body.city;
    var state = event.body.state;
    var country = event.body.country;
    var minEmployee = event.body.minEmployee;
    var maxEmployee = event.body.maxEmployee;
    var minRevenue = Math.floor(event.body.minRevenue * 1000);
    var maxRevenue = Math.ceil(event.body.maxRevenue *1000);
    var relProIndustries = event.body.relProIndustries;

    var minIntensity = event.body.minIntensity;

    var page = event.body.page || 1;
    var pageSize = event.body.pageSize || 10;
    var start = (page - 1) * pageSize;

    var sortOrder = event.body.sortOrder || "";
    var sortField = event.body.sortField || "";

    var queryString = "(and ";

    dataCategories = _.filter(dataCategories, function (dc) {
        return dc.categoryType == 1;
    });

    if (categoryId > 0) {
        queryString += 'relpro_category_id:' + categoryId + ' ';
        paid = dataCategories.length > 0;

    } else if (categoryId == -1) { //All paid
        if(dataCategories.length > 0){
            paid = true;
            queryString += "(or ";
            _.each(dataCategories, function (val) {
                queryString += "relpro_category_id:" + val.categoryId + " ";
            }, this);
            queryString += ") ";
        }
    } else if (categoryId == -2) { //All unpaid
        paid = false;
        if(dataCategories.length > 0) {
            queryString += "(not(or ";
            _.each(dataCategories, function (val) {
                queryString += "relpro_category_id:" + val.categoryId + " ";
            }, this);
            queryString += ")) ";
        }
    }

    console.log("paid=" + paid);

    if (vendorId > 0) {
        queryString += 'relpro_vendor_id:' + vendorId+ ' ';
    }

    if (productId > 0) {
        queryString += 'relpro_product_id:' + productId+ ' ';
    }

    var buildCompanySearch = function(word){
        return '(or company_name_lower:\'' + word + '\' (prefix field=company_name_lower \'' + word + '\') zoom_company_name_lower:\'' + word + '\' (prefix field=zoom_company_name_lower \'' + word + '\')) ';
    };

    if (paid && company != "") {
        var lCompany = company.toLocaleLowerCase();
        if(lCompany.indexOf(" ") < 0){
            queryString += buildCompanySearch(lCompany);
        } else {
            queryString += "(and ";
            var parts = lCompany.split(" ");
            _.each(parts, function(part){
                queryString += buildCompanySearch(part);
            }, this);
            queryString += ") ";
        }
    }

    if (paid && domain != "") {
        var lDomain = domain.toLocaleLowerCase();
        queryString += '(or url:\'' + lDomain + '\' zoom_url:\'' + lDomain + '\') ';
    }

    if (paid && city != "") {
        var cities = [];
        if(city.indexOf(",") > -1){
            cities = city.toLocaleLowerCase().split(",");
        } else {
            cities.push(city.toLocaleLowerCase());
        }
        queryString += "(or ";
            _.each(cities, function(lCity){
                queryString += ' zoom_city:\'' + lCity.trim() + '\' ';
            }, this);
        queryString += ") ";
    }


    if (state != "") {
        var states = [];
        if(state.indexOf(",") > -1){
            states = state.toLocaleLowerCase().split(",");
        } else {
            states.push(state.toLocaleLowerCase());
        }
        queryString += "(or ";
        _.each(states, function(lState){
            queryString += ' zoom_state:\'' + lState.trim() + '\' ';
        }, this);
        queryString += ") ";
    }


    if (country != "") {
        var countries = [];
        if(country.indexOf(",") > -1){
            countries = country.toLocaleLowerCase().split(",");
        } else {
            countries.push(country.toLocaleLowerCase());
        }
        queryString += "(or ";
        _.each(countries, function(lCountry){
            queryString += ' zoom_country:\'' + lCountry.trim() + '\' ';
        }, this);
        queryString += ") ";
    }

    if(minIntensity > 0){
        queryString += " (range field=intensity [" + minIntensity + ",}) ";
    }

    if (paid) {
        if (minEmployee > 0 || maxEmployee > 0) {
            if (maxEmployee == 0) {
                queryString += "(range field=zoom_number_employees [" + minEmployee + ",}) ";
            } else {
                queryString += "(range field=zoom_number_employees [" + minEmployee + ", " + maxEmployee + "]) ";
            }
        }
    } else if (minEmployee > 0) {
        queryString += "(range field=zoom_number_employees [" + minEmployee + ",}) ";
    }


    console.log("maxRevenue=" + maxRevenue);

    if (paid) {
        console.log("1a");
        if (minRevenue > 0 || maxRevenue > 0) {
            if (maxRevenue == 0) {
                console.log("2a");
                queryString += "(range field=zoom_revenue [" + minRevenue + ",}) ";
            } else {
                console.log("2b");
                queryString += "(range field=zoom_revenue [" + minRevenue + ", " + maxRevenue + "]) ";
            }
        }
    } else if (minRevenue > 0) {
        console.log("1b");
        queryString += "(range field=zoom_revenue [" + minRevenue + ",}) ";
    }

    if (relProIndustries != undefined && relProIndustries.length > 0) {
        if (relProIndustries.length > 1) {
            queryString += "(or ";
            _.each(relProIndustries, function(val){
                queryString += "relpro_industry_id:" + val + " ";
            }, this);
            queryString += ") ";

        } else {
            queryString += "relpro_industry_id:" + relProIndustries[0] + " ";
        }
    }

    queryString+= ")";

    if(queryString == "(and )"){
        queryString = "matchall";
    }

    console.log(queryString)

    var sortCloudSearch = '';
    if (sortField != undefined && sortField != '') {

        if (sortOrder == 'dsc') {
            sortOrder = 'desc';
        }

        if (sortOrder == undefined || sortOrder == '') {
            sortOrder = 'asc';
        }


        switch (sortField) {
            case "id":
                sortCloudSearch = "relpro_techsearch_id " + sortOrder;
                break;
            case "name":
                sortCloudSearch = "zoom_company_name_lower " + sortOrder + ", company_name_lower " + sortOrder;
                break;
            case "altName1":
                sortCloudSearch = "alt_org_name_1 " + sortOrder;
                break;
            case "altName2":
                sortCloudSearch = "alt_org_name_2 " + sortOrder;
                break;
            case "headline":
                sortCloudSearch = "";
                break;
            case "city":
                sortCloudSearch = "zoom_city " + sortOrder;
                break;
            case "state":
                sortCloudSearch = "zoom_state " + sortOrder;
                break;
            case "country":
                sortCloudSearch = "zoom_country " + sortOrder;
                break;
            case "employees":
                sortCloudSearch = "zoom_number_employees " + sortOrder;
                break;
            case "revenue":
                sortCloudSearch = "zoom_revenue " + sortOrder;
                break;
            case "numberIndividuals":
                sortCloudSearch = "relpro_number_profiles " + sortOrder;
                break;
            case "industryLabel1":
                sortCloudSearch = "zoom_industry_label_1 " + sortOrder;
                break;
            case "industryLabel2":
                sortCloudSearch = "zoom_industry_label_2 " + sortOrder;
                break;
            case "intensity":
                sortCloudSearch = "intensity " + sortOrder;
                break;
            case "lastVerified":
                sortCloudSearch = "date_last_verified " + sortOrder;
                break;
            case "rcpId":
                sortCloudSearch = "relpro_rcp_id " + sortOrder;
                break;
            case "category":
                sortCloudSearch = "category_name_lower " + sortOrder;
                break;
            default:
                sortCloudSearch = "company_name " + sortOrder;
                break;
        }
    } else {
        sortCloudSearch = 'company_name asc';
    }

    var searchParams = {
        query: queryString,
        queryParser: 'structured',
        size: parseInt(pageSize),
        start: parseInt(start),
        sort: sortCloudSearch
    };

    return searchParams;
};

module.exports.PromiseRequest = Promise.method(function(options, body) {
    var logResponse = options.logResponse != null ? options.logResponse : true;
    return new Promise(function(resolve, reject) {
        var request = https.request(options, function(response) {
            // Bundle the result
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'trailers': response.trailers,
                'error': response.error
            };
            response.setEncoding('utf-8');
            var responseString = "";

            // Build the body
            response.on('data', function(chunk) {
                responseString += chunk;
            });

            // Resolve the promise when the response ends
            response.on('end', function() {
                result.body = JSON.parse(responseString.trim());
                if(logResponse){
                    console.log("Promise Request response=" + JSON.stringify(result.body));
                }
                resolve(result);
            });
            response.on('error', function(error) {
                console.log('Problem with response:', error.message);
                reject(error);
            });

        });

        // Handle errors
        request.on('error', function(error) {
            console.log('Problem with request:', error.message);
            reject(error);
        });

        if (body != undefined) {
            request.write(JSON.stringify(body));
        }

        // Must always call .end() even if there is no data being written to the request body
        request.end();
    }, body);
});

module.exports.createErrorMsg = function(errNum, method) {
    var response;
    switch (errNum) {
        case -300:
            response = {
                "error": {
                    "message": "Session.",
                    "method": method,
                    "status": -300
                }
            };
            break;

        case -200:
            response = {
                "error": {
                    "message": "Something went wrong.",
                    "method": method,
                    "status": -200
                }
            };
            break;

        case -280:
            response = {
                "error": {
                    "message": "Categories Not Permissioned",
                    "method": method,
                    "status": -280
                }
            };
            break;

        case -281:
            response = {
                "error": {
                    "message": "Vendor name not provided",
                    "method": method,
                    "status": -281
                }
            };
            break;

        case -282:
            response = {
                "error": {
                    "message": "Product name not provided",
                    "method": method,
                    "status": -282
                }
            };
            break;

        case -283:
            response = {
                "error": {
                    "message": "Zero data reveals left in your trial. Please purchase a tech search subscription plan.",
                    "method": method,
                    "status": -283
                }
            };
            break;

        case -284:
            response = {
                "error": {
                    "message": "Tech Search results may be available for this company.<br><br>You must use one of your reveals in your Tech Search trial to see this information or purchase a Tech Search category you want to see.",
                    "method": method,
                    "status": -284
                }
            };
            break;

        case -285:
            response = {
                "error": {
                    "message": "Tech Search Failed: RelPro is being notified of the error.",
                    "method": method,
                    "status": -285
                }
            };
            break;

        case -286:
            response = {
                "error": {
                    "message": "URL was not provided.",
                    "method": method,
                    "status": -286
                }
            };
            break;

        case -287:
            response = {
                "error": {
                    "message": "Tech Search document ID was not provided.",
                    "method": method,
                    "status": -285
                }
            };
            break;

        case -288:
            response = {
                "error": {
                    "message": "Industry Name not provided.",
                    "method": method,
                    "status": -288
                }
            };
            break;

        case -289:
            response = {
                "error": {
                    "message": "Category not provided.",
                    "method": method,
                    "status": -289
                }
            };
            break;

        case -290:
            response = {
                "error": {
                    "message": "A non tech search source id was provided.",
                    "method": method,
                    "status": -290
                }
            };
            break;

        case -110:
            response = {
                "error": {
                    "message": "Please complete all fields correctly.",
                    "method": method,
                    "status": -110
                }
            };
            break;

        case -118:
            response = {
                "error": {
                    "message": "Google ReCaptcha Failed.",
                    "method": method,
                    "status": -118
                }
            };
            break;

        case -400:
            response = {
                "error": {
                    "message": "Unauthorized Access",
                    "method": method,
                    "status": -400
                }
            };
            break;
    }
    console.log("Error Occurred: " + JSON.stringify(response));
    return response;

};

module.exports.errorCheck = function(errorObject, method) {

    if (errorObject.error.status == -300) {
        return {
            "error": {
                "message": "userToken Not Correct.",
                "method": method,
                "status": -300
            }
        };

    } else if (errorObject.error.status == -900) {
        return {
            "error": {
                "message": "You've ran out reveals. Please contact RelPro and subscribe to a TechSearch plan.",
                "method": method,
                "status": -900
            }
        };
    } else {
        return {
            "error": {
                "message": "Error: Error code unknown",
                "method": method,
                "status": 0
            }
        };

    }

};

module.exports.buildDomainTechStackSearch = function(endpoint, errorObject, method) {
    var domainTechStackSearch = new AWS.CloudSearchDomain({
        //endpoint: 'search-domain-tech-search-q1-2016-smf2xqyd2zxadg3dlw2e2wrx6q.us-east-1.cloudsearch.amazonaws.com',
        //endpoint: 'search-domain-tech-search-q2-2016-rgij4uoeclptny3hi4buatcopa.us-east-1.cloudsearch.amazonaws.com',
        endpoint: endpoint,
        apiVersion: '2013-01-01',
        region: 'us-east-1'
    });
    Promise.promisifyAll(Object.getPrototypeOf(domainTechStackSearch));
    return domainTechStackSearch;
};

module.exports.buildCompanySearch = function(endpoint, errorObject, method) {
    var companySearch = new AWS.CloudSearchDomain({
         endpoint: endpoint,
        apiVersion: '2013-01-01',
        region: 'us-east-1'
    });
    Promise.promisifyAll(Object.getPrototypeOf(companySearch));
    return companySearch;
};

module.exports.synonyms = [{
    "find": "iot",
    "replace": "internet of thing"
}];

module.exports.multiWordSearch = function(find, objects, objectWordifier){
    var synonyms = module.exports.synonyms;

    var returnVal = [];

    var synonym = _.filter(synonyms, function (synonym){
        return synonym.find == find;
    });

    if(synonym != undefined && synonym != null && synonym.length > 0){
        console.log("found syn");
        find = synonym[0].replace;
        console.log(find);
    }

    var queryWords = find.replace(/[^a-zA-Z ]/g, "").split(" ");
    queryWords = _.reject(queryWords, function (queryword) {
        return _.any(stopWordsLib.stopWords, function (stopword) {
            return stopword.trim() == queryword.trim();
        })
    });

    console.log(JSON.stringify(queryWords));

    returnVal = _.filter(objects, function(obj){
        var keywordParts = objectWordifier(obj).toLowerCase().split(" ");
        return _.every(queryWords, function(queryWord){
            return _.any(keywordParts, function(keywordPart){
                return keywordPart != "" && keywordPart.indexOf(queryWord) == 0 &&  _.reject(stopWordsLib.stopWords, function (stopword) {
                    return stopword.trim() == keywordPart.trim();
                });
            });
        });
    });

    return returnVal;

};