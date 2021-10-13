const chai = require("chai");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

const { promisify } = require("util");
const request = promisify(require("request"));

const token = require("./token");
const url = "http://localhost:3000";


describe("Auth API", () => {

  it("It should create the user", async () => {
    
    let data = {
      name: "Ankita",
      role: "admin",
      email: "ankita1239@gmail.com",
      password: "testing",
      passwordConfirm: "testing",
    };

    let options = {
      method: "POST",
      url: `${url}/user/signup`,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    };
    const { statusCode, body } = await request(options);
    console.log(statusCode, body);

    chai.assert.isNotNull(body);
    chai.assert.strictEqual(statusCode, 201);
  
  });
});



describe("Login API", ()=>{
  it("It should login the user", async()=>{
    let data = {
      "email": "ankita123@gmail.com",
      "password": "testing"
  }

    let options = {
      method: "POST",
      url: `${url}/user/login`,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    };

    const { statusCode, body } = await request(options);
    console.log(statusCode, body);
    chai.assert.isNotNull(body);
    chai.assert.strictEqual(statusCode, 200);

  })
})