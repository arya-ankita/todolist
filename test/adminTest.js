const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../app');

chai.use(chaiHTTP);

const token = require('./token');

console.log(token);

describe('Auth API', () => {
    describe('POST /user/signup', () => {
      it('It should create the user', (done) => {
        chai.request(app)
          .post('/admin/deleteUser')
          .set({Authorization: `Bearer ${token.Admin}`})
          .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
  