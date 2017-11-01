'use strict';

module.exports.handler = function (event, context, cb) {
    var summaries = require("lib/hg_summary");
    console.log('Received event:', event);
    console.log(JSON.stringify(event, null, ' '));
    var eBody = JSON.parse(event.body);
    var category = eBody.categoryName;
    var vendor = eBody.vendorName;
    var product = eBody.productName;
    var queryString = "";
    queryString += "(or ";
    var summaryDetail = summaries.summaryDetails(vendor, product, category);
    console.log(JSON.stringify(summaryDetail));
    return cb(null, {"statusCode": 200, "body": JSON.stringify({"results": summaryDetail})});
};
