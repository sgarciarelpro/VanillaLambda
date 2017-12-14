'use strict';

var _= require("underscore");
var Promise = require("bluebird");

// Require Logic
var lib = require('lib');
var createErrorMsg = lib.createErrorMsg;
var PromiseRequest = lib.PromiseRequest;

var getAddress = function(address){
    var addressStr = "";

    var appendStr = function(str1, str2){
        if(str2 != ""){
            if(str1 != ""){
                str1+=",";
            }
            str1 += str2;
        }
        return str1;
    };

    addressStr = appendStr(addressStr, address.streetAddress);
    addressStr = appendStr(addressStr, address.city);
    addressStr = appendStr(addressStr, address.stateOrRegion);
    addressStr = appendStr(addressStr, address.country);
    addressStr = appendStr(addressStr, address.postalCode);

    addressStr = addressStr.split(' ').join('+');

    var query = '/maps/api/geocode/json?address=' + addressStr + '&key=AIzaSyDkBo6KDBfLY78R0UyEyBZP1GdOBnMPWRo';

    console.log(query);

    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: query,
        method: 'GET',
        logResponse: false
    };

    return PromiseRequest(options, null)
        .bind(this)
        .then(function(data){
            if(
                data != undefined &&
                data.body != undefined &&
                data.body.results != undefined &&
                data.body.results.length > 0 &&
                data.body.results[0].geometry != undefined &&
                data.body.results[0].geometry.location != undefined
            ){
                address.latitude = data.body.results[0].geometry.location.lat;
                address.longitude = data.body.results[0].geometry.location.lng;
            } else {
                address.latitude = 0;
                address.longitude = 0;
            }
        })
        .catch(function(err){
            console.log(err.message);
        });

};

var getDistanceFromLatLonInKm  = function (lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
};

var deg2rad = function(deg) {
    return deg * (Math.PI/180);
};


module.exports.handler = function(event, context, cb) {
    var eBody = JSON.parse(event.body);
    return getAddress(eBody.closestTo)
        .bind(this)
        .then(function(data){
            return Promise.map(eBody.addresses, function(address){
                return getAddress(address);
            }, {
                concurrency: 5
            });
        })
        .then(function(){
            eBody.addresses = _.sortBy(eBody.addresses, function(address){
                var dist = getDistanceFromLatLonInKm(
                    address.latitude,
                    address.longitude,
                    eBody.closestTo.latitude,
                    eBody.closestTo.longitude
                )
                console.log(dist);
                return dist;
            }, this);
            cb(null, {"statusCode": 200, "body":JSON.stringify({best: eBody.addresses[0]})});
        });
};
