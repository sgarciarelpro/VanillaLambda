'use strict';

var _ = require("underscore");
var mysql = require('mysql');

var config = require("config/env-config.js").config;

// Require Logic
var lib = require('lib');
var createErrorMsg = lib.createErrorMsg;

module.exports.handler = function (event, context, cb) {
    var stage = event.stageVariables.functionAlias;
    var host = config[stage].relProHost;
    var basePath = config[stage].relProBasePath;
    if (basePath == '/') basePath = '';
    var category = event.body.category;

    var connection = mysql.createConnection({
        connectionLimit: 10,
        host: config[stage].techSearchDatabaseHost,
        user: config[stage].techSearchDatabaseUserID,
        password: config[stage].techSearchDatabasePassword,
        database: config[stage].techSearchDatabaseName
    });

    var sql = 'select distinct c.id as id, c.name as name ' +
        'from category_2016_q4 as c ' +
        'inner join connections on connections.category_id = c.id ';

    if (category != "") {
        sql += 'where c.name like \'%' + category + '%\' ';
    }

    sql += "order by name";

    console.log(sql);

    connection.query(sql,
        function (err, result, fields) {
            if (err) {
                console.error(err);
                var errorResponse = createErrorMsg(-300, "SearchCategories");
                connection.end(function () {
                    return cb(null, {"body":JSON.stringify(errorResponse), "statusCode": 400});
                });
            } else {
                connection.end(function () {
                    return cb(err, {"body": JSON.stringify(result), "statusCode": 200});
                });
            }
        }, context);
}

