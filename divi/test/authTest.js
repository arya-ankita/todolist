const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../app');

chai.use(chaiHTTP);

const token = require('./token');

console.log(token);

describe('Auth API', () => {
  describe('POST /user/signup', () => {
    it('It should create the user', (done) => {
      const user = {
        "name": "Ankita",
        "role": "admin",
        "email": "ankita1asdasdads@gmail.com",
        "password": "testing",
        "passwordConfirm":"testing"
    }
      chai.request(app)
        .post('/user/signup')
        //.set({Authorization: `Bearer ${token.Admin}`})
        .send(user)
        .end((err, res) => {
          console.log("error",err,res.status, );
          chai.expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
