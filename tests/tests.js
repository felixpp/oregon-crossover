var should = require('should');
var request = require('request');
var mailer = require('../src/index');

describe('interact with TFS API', function() {
  it('should return a 203', function(done) {
    request.get('http://jbourbonnais.visualstudio.com', function (err, res, body){
      res.statusCode.should.equal(203);
      done();
    });
  });
});
