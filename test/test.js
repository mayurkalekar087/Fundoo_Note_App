const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const user = require('./user.test.json');
chai.should();
chai.use(chaiHttp);

describe("User Registration ", () => {
    it("given_validDetails_WhenCorrect_ShouldReturn201", (done) => {
      const userDetails = user.user.validDetails;
      chai
        .request(server)
        .post("/register")
        .send(userDetails)
       .end((err, res) => {
          if(err){
          return done(err);
      }
          res.should.have.status(201);
          done();
        });
    });
    it('givenEmptyFirstName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithEmptydFirstName;
        chai
        .request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenEmptyLastName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithEmptyLastName;
        chai
        .request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenInvalidEmailId_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidmail;
        chai
        .request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenWeakPassword_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithWeakPassword;
        chai
        .request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
});