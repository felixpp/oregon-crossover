var should = require('should');
var request = require('request');
var server = require('../src/server.js');

describe('interact with our server', function() {
  it('should start and return a 200', function(done) {
    request.get('http://localhost:8000', function (err,res,body){
      before(function() {
        server.listen(8000);
      });

      after(function(){
        server.close();
      });
    });
  });
});

describe('interact with TFS API', function() {
  it('should return a 200', function(done) {
    request.get('http://jbourbonnais.VisualStudio.com', function (err, res, body){
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
