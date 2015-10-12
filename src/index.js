/**
 * Created by fperreault on 12/1/2014.
 */

// Gets the Q library.
var Q = require('q');
var request = require('request');

module.exports.getBranches = function (account, apiVersion, includeChildren, includeDeleted) {

    var url = "https://" + account +
        ".visualstudio.com/defaultcollection/_apis/tfvc/branches?api-version=" + apiVersion +
        "&includechildren=" + includeChildren + "&includedeleted=" + includeDeleted;

    var defer = Q.defer();
    request.get(url, function(err, res, body){
        if(res.statusCode == '203'){
            defer.resolve({"err":err,"res": res,"body": body});
        } else {
            defer.reject(err.toString());
        }
    });

    return defer.promise;
};