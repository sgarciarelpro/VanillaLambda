'use strict';

var _= require("underscore");
var Promise = require("bluebird");

var config = require("config/env-config.js").config;

// Require Logic
var lib = require('lib');
var classificationsLib = require('lib/classifications');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;

var keywords = classificationsLib.keywords;

var headers ={};

var useAuth = function(authValue, type, cb, event, host, basePath){
    console.log("host="+host);
    var eBody = JSON.parse(event.body);
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
        .bind(this)
        .then(function(isLoggedInResp){
            var response = [];
            if(isLoggedInResp.body.status == 100){
                return new Promise(function(resolve, reject){
                    try{
                        var pageSize = 20;
                        var query = eBody.query.toLowerCase();
                        console.log("query=" + query);

                        var eMatches = [];
                        var pMatches = [];

                        var matches = [];

                        if(query.trim() != ""){
                            eMatches = _.filter(keywords, function(keyword){
                                return keyword.keyword.toLowerCase().indexOf(query) == 0;
                            });



                            // if(query.indexOf(" ") > -1) {

                                pMatches = lib.multiWordSearch(query, keywords, function(keyword){
                                    return keyword.keyword;
                                })

                            /*} else {
                                pMatches = _.filter(keywords, function(keyword){
                                    return keyword.keyword.toLowerCase().indexOf(query) > 0;
                                });
                            }*/


                            matches = eMatches.concat(pMatches);

                            console.log(JSON.stringify(matches));

                            matches = _.uniq(matches, false, function(match){
                                return match.keyword;
                            });

                            console.log(JSON.stringify(matches));

                            resolve(matches);

                        } else {
                            response = [];
                            for(var i = 0; i < pageSize; i++){
                                response.push(keywords[i]);
                            }
                            resolve(response);
                        }

                    } catch(err){
                        reject (err);
                    }

                }).then(function(response){
                    return cb(null, {"statusCode": 200, "body":JSON.stringify({keywords: response})});
                }).catch(function(err){
                    console.log(err);
                    console.log(err.stack);
                    var errorResponse = createErrorMsg(-200, "KeywordsSearch");
                    return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
                });

            } else {
                var errorResponse = createErrorMsg(-300, "KeywordsSearch");
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

    var userToken = event.headers.userToken;
    var bearer = event.headers.Authorization;
    if (bearer != undefined && bearer != null && bearer != "") {
        useAuth(bearer, "Authorization", cb, event, host, basePath);
    } else if (userToken != undefined && userToken != null && userToken != "") {
        useAuth(userToken, "userToken", cb, event, host, basePath);
    } else {
        var errorResponse = createErrorMsg(-300, "KeywordsSearch");
        return cb(null, {"statusCode": 400, "body": JSON.stringify(errorResponse)});
    }
};
