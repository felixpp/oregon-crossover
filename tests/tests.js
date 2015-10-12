var should = require('should');
var request = require('request');
var server = require('../src/server.js');
var module = require('../src/index.js');

describe('interact with our server', function() {
  it('should start and return a 200', function(done) {
    request.get('http://localhost:8000', function (err,res,body){
      before(function() {
        server.listen(8000);
      });

      body.should.equal('Hello World\n');
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('should 404 on bad routes',function(done) {
    request.get('http://localhost:8000/notARealRoute', function (err,res,body){
      before(function() {
        server.listen(8000);
      });

      res.statusCode.should.equal(404);
      done();
    });
  });

  it('should have routes',function(done){
    request.get('http://localhost:8000/authOnTFS', function (err,res,body){
      before(function() {
        server.listen(8000);
      });

      body.should.not.equal('Hello World\n');
      res.statusCode.should.equal(200);
      done();
    });
  });
});

describe('interact with TFS API', function() {
  it('should return a 203', function(done) {
    request.get('http://jbourbonnais.visualstudio.com', function (err, res, body){
      res.statusCode.should.equal(203);
      done();
    });
  });

  it('should get branches', function(done){
    module.getBranches('jbourbonnais', '1.0', true, true).then(function (results) {
      console.log(results);
    }, function (error) {
      error.should.not.be.ok;
    }).done(function(){
      done();
    });
  });
});
