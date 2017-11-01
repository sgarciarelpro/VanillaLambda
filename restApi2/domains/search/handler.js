'use strict';

var _ = require("underscore");
var moment = require('moment');
var https = require('https');

// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../../lib');
var createErrorMsg = lib.createErrorMsg;
var hgDataSourceId = lib.hgDataSourceId;

var host = process.env.relProHost;
var basePath = process.env.relProBasePath;
if (basePath == '/') basePath = '';

var techSearchEndpoint = process.env.techSearchEndpoint;
var domainTechStackSearch = lib.buildDomainTechStackSearch(techSearchEndpoint);

module.exports.handler = function(event, context, cb) {

  console.log("Event=" + JSON.stringify(event, null, ' '));

  if (event.header.userToken != "" && event.header.userToken != undefined){

    var options = {
      host : host,
      port : 443,
      path : basePath + '/prospector/v1/user/data/categories/' + hgDataSourceId.toString(),
      method : 'GET',
      headers : {'userToken' : event.header.userToken}
    };

    var req = https.request(options, function(res) {

      res.setEncoding('utf-8');

      var responseString = '';

      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {

        var responseObject = JSON.parse(responseString.trim());
        var response;

        if (responseObject.error) {

          if (responseObject.error.status == -300) {
            var errorResponse = createErrorMsg(-300, "SearchDomain");
            return cb(null, errorResponse);

          } else {
            var errorResponse = createErrorMsg(-285, "SearchDomain");
            return cb(null, errorResponse);
          }

        } else {

          if (_.isEmpty(responseObject.dataCategories) == false) {

            var permCategories = responseObject.dataCategories;
            /** @namespace permCategories[0].sourceId */
            if (permCategories[0].sourceId == hgDataSourceId) {

              /** @namespace permCategories[0].categoryName */
              if (permCategories[0].categoryName == 'all') {

                response = {"message": "Error: Too many categories requested"};
                return cb(null, response);

              } else {

                var page;
                if (event.body.page != undefined) {
                  page = event.body.page - 1;
                } else {
                  page = 0;
                }
                var pageSize = event.body.pageSize || 10;
                var start = page * pageSize;
                var category = event.body.category || "";
                var product = event.body.product || "";
                var vendor = event.body.vendor || "";
                var category_id = event.body.category_id || "";
                var product_id = event.body.product_id || "";
                var vendor_id = event.body.vendor_id || "";
                var company = event.body.companyName || "";
                var company_location = event.body.companyLocation || "";
                var min_company_revenue = event.body.minCompanyRevenue;
                var max_company_revenue = event.body.maxCompanyRevenue;
                var min_company_employees = event.body.minCompanyEmployees;
                var max_company_employees = event.body.maxCompanyEmployees;
                var industryCode = event.body.companyIndustry || "";
                var relProIndustries = event.body.relProIndustries || "";
                var sortOrder = event.body.sortOrder || "";
                var sortField = event.body.sortField || "";
                var queryString = "";
                if (category != '' && category != undefined) {
                  queryString += "(or ";
                  _.each(category, function(val){
                    queryString += "category_name:'" + val.name + "' ";
                  }, this);
                  queryString += ") ";
                }

                console.log(event.body.minCompanyRevenue);
                console.log(max_company_revenue);

                if (product != '' && product != undefined) {
                  queryString += "(and ";
                  queryString += "product_name:'" + product + "' ";
                  if (permCategories != '' && permCategories != undefined) {
                    queryString += "(or ";

                    _.each(permCategories, function (val) {
                      queryString += "relpro_category_id:" + val.categoryId + " ";
                    }, this);
                    queryString += ") ";
                  }
                  if (company_location != '' && company_location != undefined || company != '' && company != undefined ||
                      min_company_revenue != '' && min_company_revenue != undefined || min_company_employees != '' && min_company_employees != undefined ||
                      max_company_revenue != '' && max_company_revenue != undefined || max_company_employees != '' && max_company_employees != undefined
                      || industryCode != '' && industryCode != undefined || (relProIndustries != undefined)) {

                    if (company_location != '' && company_location != undefined) {
                      queryString += "(or zoom_city:'" + company_location + "' zoom_state:'" + company_location + "' zoom_country:'" + company_location + "') ";
                    }
                    if (company != '' && company != undefined) {
                      queryString += "(or company_name:'" + company + "' url:'" + company + "') ";
                    }
                    if (min_company_revenue != undefined) {
                      if(max_company_revenue == 0){
                        if(min_company_revenue != 0){
                          queryString += "(range field=zoom_revenue [" + min_company_revenue + ",}) ";
                        }
                      } else {
                        queryString += "(range field=zoom_revenue [" + min_company_revenue + ", " + max_company_revenue + "]) ";
                      }
                    }
                    if (min_company_employees != undefined) {
                      if(max_company_employees == 0){
                        if(min_company_employees) {
                          queryString += "(range field=zoom_number_employees [" + min_company_employees + ",}) ";
                        }
                      } else {
                        queryString += "(range field=zoom_number_employees [" + min_company_employees + ", " + max_company_employees + "]) ";
                      }
                    }
                    if (industryCode != '' && industryCode != undefined) {
                      if (industryCode.length > 1) {
                        queryString += "(or ";
                        _.each(industryCode, function(val){
                          queryString += "zoom_industry_label_2:'" + val + "' ";
                        }, this);
                        queryString += ") ";

                      } else {
                        queryString += "zoom_industry_label_2:'" + industryCode[0] + "' ";
                      }
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
                  }
                  queryString += ") ";
                }
                if (vendor != '' && vendor != undefined) {
                  queryString += "(and ";
                  queryString += "vendor_name:'" + vendor + "' ";
                  if (permCategories != '' && permCategories != undefined) {
                    queryString += "(or ";
                    _.each(permCategories, function (val) {
                      queryString += "relpro_category_id:" + val.categoryId + " ";
                    }, this);
                    queryString += ") ";
                  }
                  if ((company_location != '' && company_location != undefined) || (company != '' && company != undefined) ||
                      (min_company_revenue != '' && min_company_revenue != undefined) || (min_company_employees != '' && min_company_employees != undefined) ||
                      (max_company_revenue != '' && max_company_revenue != undefined) || (max_company_employees != '' && max_company_employees != undefined) ||
                      (industryCode != '' && industryCode != undefined) || (relProIndustries != undefined)) {

                    if (company_location != '' && company_location != undefined) {
                      queryString += "(or zoom_city:'" + company_location + "' zoom_state:'" + company_location + "' zoom_country:'" + company_location + "') ";
                    }
                    if (company != '' && company != undefined) {
                      queryString += "(or company_name:'" + company + "' url:'" + company + "') ";
                    }
                    if (min_company_revenue != undefined) {
                      if(max_company_revenue == 0){
                        if(min_company_revenue != 0){
                          queryString += "(range field=zoom_revenue [" + min_company_revenue + ",}) ";
                        }
                      } else {
                          queryString += "(range field=zoom_revenue [" + min_company_revenue + ", " + max_company_revenue + "]) ";
                      }
                    }
                    if (min_company_employees != undefined) {
                      if(max_company_employees == 0){
                        if(min_company_employees) {
                          queryString += "(range field=zoom_number_employees [" + min_company_employees + ",}) ";
                        }
                      } else {
                          queryString += "(range field=zoom_number_employees [" + min_company_employees + ", " + max_company_employees + "]) ";
                      }
                    }
                    if (industryCode != '' && industryCode != undefined) {
                      if (industryCode.length > 1) {
                        queryString += "(or ";
                        _.each(industryCode, function(val){
                          queryString += "zoom_industry_label_2:'" + val + "' ";
                        }, this);
                        queryString += ") ";

                      } else {
                        queryString += "zoom_industry_label_2:'" + industryCode[0] + "' ";
                      }
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
                  }
                  queryString += ") ";

                }

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
                  }
                } else {
                  sortCloudSearch = 'company_name asc';
                }

                var searchParams = {
                  query: queryString,
                  queryParser: 'structured',
                  //queryOptions: '',
                  size: parseInt(pageSize),
                  start: parseInt(start),
                  sort: sortCloudSearch
                };
                console.log("searchParams=" + JSON.stringify(searchParams));
                domainTechStackSearch.searchAsync(searchParams).then(
                    function (req) {

                      if (req != undefined) {
                        console.log("CloudSearch Results Received   TotalFound=" + req.hits.found + " NumResultsReturned=" + req.hits.hit.length);
                        var batch = [];
                        req.hits.hit.forEach(function(hit) {
                          var doc = {};
                          var fields = hit.fields;
                          for (var k in fields) {
                            if (fields.hasOwnProperty(k)) {
                              var obj = fields[k];
                              for (var prop in obj) {
                                if (k == "date_first_verified" || k == "date_last_verified") {
                                  if (moment(obj[prop], moment.ISO_8601).isValid()) {
                                    doc[k] = moment(obj[prop]).format('MM/DD/YYYY');
                                  }
                                } else {
                                  doc[k] = obj[prop];
                                }
                              }
                            }
                          }
                          batch.push(doc);
                        });

                        var page = Math.floor(parseInt(req.hits.start) / searchParams.size) + 1;
                        console.log("calculated page=" + page);
                        if (page < 0 ) page = 1;

                        return {"message": "Success", page: page, pageSize: searchParams.size, organizations: batch, found: req.hits.found};

                      } else {

                        response =  {"message": "No companies found", page: "", pageSize: "", organizations: "", found: "0"};
                        return cb(null, response);

                      }
                    }
                ).then(function(data){
                  if (data) {
                    return cb(null, data);
                  } else {
                    var response =  {"message": "No companies found", page: "", pageSize: "", organizations: "", found: "0"};
                    return cb(null, response);
                  }
                }).catch(function(error) {
                  console.error(error);
                  var errorResponse = createErrorMsg(-285, "SearchDomain");
                  return cb(null, errorResponse);

                });
              }

            } else {
              var errorResponse = createErrorMsg(-290, "SearchDomain");
              return cb(null, errorResponse);

            }

          } else {
            var errorResponse = createErrorMsg(-280, "SearchDomain");
            return cb(null, errorResponse);
          }
        }
      });

    }).on('error', function() {
      var errorResponse = createErrorMsg(-280, "SearchDomain");
      return cb(null, errorResponse);
    });

    req.end();

  } else {
    var errorResponse = createErrorMsg(-300, "SearchDomain");
    return cb(null, errorResponse);

  }

};
