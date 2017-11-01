'use strict';

var AWS = require('aws-sdk');
var Promise = require('bluebird');
var https = require('https');

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

module.exports.buildCompanySearch = function(endpoint, errorObject, method) {
    var companySearch = new AWS.CloudSearchDomain({
         endpoint: endpoint,
        apiVersion: '2013-01-01',
        region: 'us-east-1'
    });
    Promise.promisifyAll(Object.getPrototypeOf(companySearch));
    return companySearch;
};
