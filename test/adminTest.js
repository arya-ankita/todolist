const chai = require("chai");
const chaiHTTP = require("chai-http");
const app = require("../app");
const authController = require("../controllers/authController");
chai.use(chaiHTTP);

const { promisify } = require("util");
const request = promisify(require("request"));

const token = require("./token");
const url = "http://localhost:3000";


describe(" Admin API", ()=>{
  it("It should delete the user", async()=>{

    let data = {
      "id":"6166a48d83011544de232c4c"
    };
    let options = {
      method: "DELETE",
      url: `${url}/admin/deleteUser`,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.Admin}`
      },
    };
      const { statusCode, body } = await request(options);
      console.log(statusCode, body);
  
      chai.assert.isNotNull(body);
      chai.assert.strictEqual(statusCode, 200);
  })
})


describe(" Admin API", ()=>{
  it("It should list all the users", async()=>{

    let options = {
      method: "GET",
      url: `${url}/admin/allUser`,
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.Admin}`
      },
    };
      const { statusCode } = await request(options);
      console.log(statusCode);
  
     // chai.assert.isNotNull(body);
      chai.assert.strictEqual(statusCode, 200);
  })
})


describe(" Admin API", ()=>{
  it("It should update the users", async()=>{

    let data = {
      "name": "updatedAkshara"
    };
    let options = {
      method: "PATCH",
      url: `${url}/admin/updateUser/6166b0b08233f0ae15d24803`,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.Admin}`
      },
    };
      const { statusCode, body } = await request(options);
      console.log(statusCode, body);
  
      chai.assert.isNotNull(body);
      chai.assert.strictEqual(statusCode, 200);
  })
})