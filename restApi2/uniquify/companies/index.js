'use strict';

var _= require("underscore");
var Promise = require('bluebird');

var config = require("config/env-config.js").config;

// Require Logic
var lib = require('lib');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;

var prepositions = ["of", "on", "by"];

var getLog = function(number){
    return Math.floor(Math.log10(number));
};

var headers ={};

var useAuth = function(authValue, type, cb, event, host, companySearch, basePath){
    console.log("host="+host);
    headers[type] = authValue;
    var isLoggedInOptions = {
        host: host,
        port: 443,
        path: basePath + '/prospector/v1/user/loggedin',
        method: 'GET',
        headers: headers,
        logResponse: false
    };
    return PromiseRequest(isLoggedInOptions, null)
        .then(function(isLoggedInResp){
            if(isLoggedInResp.body.status == 100){
                var orgBody = JSON.parse(event.body);

                console.log("body obj = ", JSON.parse(event.body));
                console.log("org body = ", orgBody);

                console.log("body obj organizations = ", orgBody.organizations);

                return Promise.map(orgBody.organizations, function(company){
                    var func = function(company){
                        var cleanNameOptions = {
                            host: host,
                            port: 443,
                            path: basePath + '/prospector/v1/identity/organization/cleanname?name=' + encodeURIComponent(company.value),
                            method: 'GET',
                            headers: headers,
                            logResponse: false
                        };
                        return PromiseRequest(cleanNameOptions, null)
                            .then(function(cleanNameOptionsResp){
                                company.cleaned = cleanNameOptionsResp.body.cleanName;
                                console.log(JSON.stringify(cleanNameOptionsResp));
                                var nextFunction = function(company){
                                    return new Promise(function(resolve, reject){
                                        var companyName = company.value;
                                        var cleanName = companyName.replace(/[^a-z0-9+]+/gi, ' ');
                                        var pieces = [];
                                        var parts = cleanName.split(" ");
                                        var hasPrep = _.any(parts, function(part){
                                            return _.any(prepositions, function(preposition){
                                                return part.toLowerCase() == preposition.toLowerCase();
                                            }, this);
                                        }, this);

                                        if(hasPrep){
                                            resolve(company.cleaned);
                                        } else {
                                            for(var i = 1; i <= parts.length; i++){
                                                pieces.push({
                                                    value: parts.slice(0, i).join(" "),
                                                    found: 1000000000,
                                                    pos: i
                                                });
                                            }
                                            if(pieces.length > 1){
                                                return Promise.map(pieces, function(piece){
                                                    var func = function(piece){
                                                        var params = {
                                                            // query: "(or org_name:'" + piece.value + "' (prefix field=org_name '" + piece.value + "'))",
                                                            query: "(or org_name:'" + piece.value + "')",
                                                            queryParser: 'structured',
                                                            sort: 'number_of_individuals desc'
                                                        };
                                                        console.log(params.query);
                                                        return companySearch
                                                            .searchAsync(params)
                                                            .then(function(req){
                                                                if(req.hits.found > 0){
                                                                    piece.found = req.hits.found;
                                                                    piece.maxInd = req.hits.hit[0].fields.number_of_individuals[0];
                                                                    piece.stat = getLog(req.hits.found);
                                                                } else {
                                                                    piece.found = 0;
                                                                    piece.maxInd = 0;
                                                                    piece.stat = 15;
                                                                }
                                                                console.log(piece.value + " had " + piece.found + " hit(s)");
                                                                console.log(piece.value + " had " + piece.maxInd + " individual(s).");
                                                                console.log(piece.value + " stat is " + piece.stat);
                                                                console.log("-----------------------");
                                                            })
                                                            .catch(function(err){
                                                                console.log(err);
                                                            });
                                                    };
                                                    return func(piece);
                                                }, {
                                                    concurrency: 1
                                                }).then(function(){
                                                    var min = 0;
                                                    for(var i = pieces.length - 1; i > 0; i--){
                                                        min = i;
                                                        console.log("------------ " + pieces[i-1].value + " vs " + pieces[i].value + "--------------")
                                                        if(pieces[i].maxInd > 0){
                                                            console.log("a1")
                                                            if((pieces[i-1].stat) - (pieces[i].stat) > 0) {
                                                                console.log("b1")
                                                                if (getLog(pieces[i-1].maxInd) - getLog(pieces[i].maxInd) < 2 && getLog(pieces[i-1].maxInd) - getLog(pieces[i].maxInd) > 0){
                                                                    console.log("c1")
                                                                    break;
                                                                } else if((pieces[i-1].maxInd > 0 && (pieces[i-1].stat) - (pieces[i].stat) < 2) || (pieces[i].stat == 0 && pieces[i-1].stat > 0 && pieces[i-1].stat < 3)){
                                                                    console.log("c2")
                                                                    min = i - 1;
                                                                }
                                                            } else if (getLog(pieces[i-1].maxInd) - getLog(pieces[i].maxInd) < 2) {
                                                                console.log("b2")
                                                                min = i - 1;
                                                            }
                                                        } else {
                                                            console.log("a2")
                                                        }
                                                    }
                                                    console.log("Min is " + min);
                                                    console.log("pieces[min].maxInd  is " + pieces[min].maxInd );
                                                    if(pieces[min].maxInd > 200){
                                                        console.log(pieces[min].value + " needs to be cleaned");
                                                        var cleanNameOptions2 = {
                                                            host: host,
                                                            port: 443,
                                                            path: basePath + '/prospector/v1/identity/organization/cleanname?name=' + encodeURIComponent(pieces[min].value),
                                                            method: 'GET',
                                                            headers: headers,
                                                            logResponse: false
                                                        };
                                                        return PromiseRequest(cleanNameOptions2, null)
                                                            .then(function(cleanNameOptionsResp2) {
                                                                resolve(cleanNameOptionsResp2.body.cleanName);
                                                            });
                                                    } else {
                                                        resolve(pieces[min].value);
                                                    }

                                                });
                                            } else if(pieces.length == 1){
                                                resolve(pieces[0].value);
                                            } else  {
                                                resolve(companyName);
                                            }
                                        }

                                    }).then(function(uniq){
                                        var parts = uniq.split(" ");
                                        if(parts[0].toLowerCase() == "the"){
                                            parts.splice(0, 1);
                                        }
                                        company.unique = parts.join(" ");
                                    })
                                }
                                return nextFunction(company);
                            });
                    };
                    return func(company);
                },{
                    concurrency: 2
                }).then(function(){
                    console.log("event body when working = ", event.body);
                    console.log("org body when working = ", orgBody);
                    return cb(null, {"statusCode": 200, "body":JSON.stringify(orgBody)});
                });
            } else {
                var errorResponse = createErrorMsg(-300, "UniquifyCompanies");
                console.log("ERROR = ", errorResponse);
                return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
            }
        })
};

module.exports.handler = function(event, context, cb)  {
    console.log('EVENT = ', event);
    var stage = event.stageVariables.functionAlias;
    console.log('STAGE = ', stage);
    var host = config[stage].relProHost;
    console.log("NEW HOST = ", host);
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var companySearchEndpoint = config[stage].companySearchEndpoint;
    console.log("companySearchEndpoint = ", companySearchEndpoint);
    var companySearch = lib.buildCompanySearch(companySearchEndpoint);

    if(event.body == undefined || event.body == null || event.body == ""){
        var errorResponse = createErrorMsg(-300, "UniquifyCompanies");
        console.log("ERROR = ", errorResponse);
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }

    if(event.headers){
        var userToken = event.headers.userToken;
        var bearer = event.headers.Authorization;
    }

    console.log("bearer =" + bearer);
    if (bearer != undefined && bearer != null && bearer != "") {
        console.log("a")
        useAuth(bearer, "Authorization", cb, event);
    } else if (userToken != undefined && userToken != null && userToken != "") {
        console.log("b")
        useAuth(userToken, "userToken", cb, event, host, companySearch, basePath);
    } else {
        var errorResponse = createErrorMsg(-300, "UniquifyCompanies");
        console.log("ERROR = ", errorResponse);
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};

