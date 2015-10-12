// ./src/server.js
var sys = require('util'),
fs = require('fs'),
http = require('http'),
url = require('url');

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World\n');
});

app.get('/authOnTFS', function(req,res){
  res.send('I\'m now authenticated on TFS...mmm not for real.');
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);



});
