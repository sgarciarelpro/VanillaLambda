var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'relpro'});

if(!process.argv[2]){
    console.log("Please add in a stage when running bat file. (dev, production, production2, prodoregon)");
    return;
}
if(process.argv[2] == "prodoregon"){
    var region = "us-west-2";
} else{
    var region = "us-east-1";
}
var lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: region, credentials: credentials});
var path = require('path');
var fs = require("fs");

var file = fs.readFile(path.join(__dirname, "index.zip"), function(err, data){
    console.log("err = ", err);
    /* This operation updates a Lambda function's code */

    var params = {
        FunctionName: "vanilla-classifications-search",
        Publish: true,
        ZipFile: data
    };
    lambda.updateFunctionCode(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            var paramsAlias = {
                Description: "Working Through Node V2",
                FunctionName: data.FunctionName,
                FunctionVersion: data.Version,
                Name: process.argv[2]
            };
            lambda.updateAlias(paramsAlias, function(err, aliasData) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    console.log("Updating Alias Data = ", aliasData);
                }
            });
            console.log("update function data = ", data);
        }
    });
});