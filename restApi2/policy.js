var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'relpro'});

var lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-1', credentials: credentials});

// var params = {
//     Action: "lambda:InvokeFunction",
//     FunctionName: "arn:aws:lambda:us-east-1:376679179744:function:restApi2-test-service:production",
//     Principal: "apigateway.amazonaws.com",
//     SourceArn: "arn:aws:execute-api:us-east-1:376679179744:yql0g431ri/*/GET/categories/all",
//     StatementId: "ID-4"
// };
// lambda.addPermission(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
// });



// CODE FOR PERMISSION TO INVOKE LAMBDA FUNCTION
//aws lambda add-permission --function-name arn:aws:lambda:us-east-1:376679179744:function:vanilla-categories-show:production --source-arn arn:aws:execute-api:us-east-1:376679179744:yql0g431ri/*/GET/categories/show --principal apigateway.amazonaws.com --statement-id 884c6adb-fceb-469f-b9ee-023ee0392168 --action lambda:InvokeFunction --region us-east-1 --profile relpro


var params = {
    FunctionName: "arn:aws:lambda:us-east-1:376679179744:function:restApi2-test-service",
    Qualifier: "dev"
};

var params2 = {
    FunctionName: "arn:aws:lambda:us-east-1:376679179744:function:restApi2-test-service",
    Qualifier: "production"
};

lambda.getPolicy(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log("dev policy", data);           // successful response
});

lambda.getPolicy(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log("production policy", data);           // successful response
});