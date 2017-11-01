'use strict';

// Require Logic
var lib = require('lib');

var PromiseRequestPostForm = lib.PromiseRequestPostForm;
var PromiseRequest = lib.PromiseRequest;
var createErrorMsg = lib.createErrorMsg;

var config = require("config/env-config.js").config;

var https = require('https');
var querystring = require('querystring');

module.exports.handler = function (event, context, cb) {
    console.log('EVENT = ', event);
    var stage = event.stageVariables.functionAlias;
    console.log('STAGE = ', stage);
    var host = config[stage].relProHost;
    console.log("NEW HOST = ", host);
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';

    var parsedBody = JSON.parse(event.body);

    console.log('Received event:');
    console.log(JSON.stringify(event, null, ' '));
    console.log("userToken=" + event.headers.userToken);
    if (event != undefined) {
        var body = {
            secret: "6LeF7B4TAAAAAKLg-kdGif1yMAatwLIw1VHxwPwb",
            response: parsedBody.gReCaptcha
        };
        var postData = querystring.stringify(body);
        var httpOptions = {
            host: "www.google.com",
            port: 443,
            path: '/recaptcha/api/siteverify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        console.log("httpOptions=" + JSON.stringify(httpOptions, null, 4));
        var getSignupRequest = PromiseRequestPostForm(httpOptions, postData).then(function (response) {
            console.log("Google Response=" + JSON.stringify(response, null, 4));
            var googleResp = response;
            if (response.body.success) {
                console.log("Google Success");
                if (event.headers.userToken != undefined && event.headers.userToken != "") {
                    var cardsSignUpOptions = {
                        host: host,
                        port: 443,
                        path: basePath + '/prospector/v1/auth/signup',
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            "userToken": event.headers.userToken
                        }
                    };
                    var body = {
                        "planId": parsedBody.planId,
                        "firstName": parsedBody.firstName,
                        "lastName": parsedBody.lastName,
                        "companyId": parsedBody.companyId,
                        "companyName": parsedBody.companyName,
                        "userName": parsedBody.userName,
                        "email": parsedBody.email,
                        "password": parsedBody.password,
                        "isAcceptTerms": parsedBody.isAcceptTerms,
                        "referrerURL": parsedBody.referrerURL,
                        "subscriptionFlag": parsedBody.subscriptionFlag,
                        "promoCode": parsedBody.promoCode
                    };
                    console.log("Body Sent to Cards=" + JSON.stringify(body));

                    var cardsRequest = PromiseRequest(cardsSignUpOptions, body).then(function (cardsResponse) {
                        console.log('Cards Response=' + JSON.stringify(cardsResponse));
                        return cb(null, {"statusCode": 200, "body":JSON.stringify(cardsResponse.body)});
                    }).catch(function () {
                        console.log("Cards Request Failed");
                        var errResponse = {"error": {"message": "Cards Failed"}};
                        return cb(null, {"statusCode": 400, "body":JSON.stringify(errResponse)});
                    });

                } else {
                    var errorResponse = createErrorMsg(-400, "signup");
                    console.log("Error=" + errorResponse);
                    return cb(null, {"statusCode": 400, "body":JSON.stringify(errResponse)});
                }

            } else {
                var errorResponse = createErrorMsg(-118, "signup");
                console.log("Error=" + errorResponse);
                return cb(null, {"statusCode": 400, "body":JSON.stringify(errResponse)});
            }
        });
    } else {
        var errorResponse = createErrorMsg(-110, "signup");
        console.log("Error=" + errorResponse);
        return cb(null, {"statusCode": 400, "body":JSON.stringify(errResponse)});
    }

};
