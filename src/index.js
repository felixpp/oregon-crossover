/**
 * Created by fperreault on 12/1/2014.
 */

var Q = require('q');
var request = require('request');
var fs = require('fs');

var connectionInfo = {};

fs.readFile('config/config.json', 'utf-8', function(err, data){
    connectionInfo = JSON.parse(data);
});

module.exports.getBranches = function (account, apiVersion, includeChildren, includeDeleted, username, password) {

    var url = "https://" + account +
        ".visualstudio.com/defaultcollection/_apis/tfvc/branches?api-version=" + apiVersion +
        "&includechildren=" + includeChildren + "&includedeleted=" + includeDeleted;

    var defer = Q.defer();

    request.get(url, {
        'auth': {
            'username': connectionInfo.user,
            'password': connectionInfo.password,
            'sendImmediately': true
        }
    }, function(err, res, body){
        if(res.statusCode == '200') {
            var json = JSON.parse(body);
            defer.resolve(json);
        } else {
            defer.reject(err.toString());
        }
    });

    return defer.promise;
};
