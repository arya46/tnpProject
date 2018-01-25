'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = require('chai').expect;
var should = require('should');

chai.use(chaiHttp);

/*Test to see if the home-page loads - used mocha and chai*/

describe('Get the first page', function () {
  it('the login page should load', function (done) {
    chai.request(app)
            .get('/')
            .end(function(err, res){
                expect(res).to.have.status(200);
              done();
            });
  });
});

/*Test to see if login is secure - used mocha and chai*/

describe('Login as admin', function () {
  it('You should log in as Admin', function (done) {

    chai.request(app)
            .post('/adminLogin')
            .send({username:'admin', password:'admin'})
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
              done();
            });
  });
});
