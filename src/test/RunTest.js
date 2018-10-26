let chai = require('chai');
var assert = chai.assert;
var http = require('http');
let chaiHttp = require('chai-http');

let should = chai.should();


describe('Basic Server test:', function() {
    it('callback', function(done) {
      http.get('http://localhost:8080/api/rooms?checkin_date=2018-10-28&checkout_date=2018-10-30&location=BOS', function(res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

  chai.use(chaiHttp);
  describe('Test Number of results', () => {
    it('it should GET all the required number of rooms', (done) => {
      
      chai.request('http://localhost:8080')
          .get('/api/rooms?checkin_date=2018-10-28&checkout_date=2018-10-30&location=BOS')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
            done();
          });
    });
});