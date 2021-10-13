const chai = require("chai");
const chaiHTTP = require("chai-http");
const app = require("../app");
const authController = require("../controllers/authController");
chai.use(chaiHTTP);

const { promisify } = require("util");
const request = promisify(require("request"));

const token = require("./token");
const url = "http://localhost:3000";


describe(" ToDo API", ()=>{
  it("It should add task in todo list of the user", async()=>{

    let data = {
        "task":"Add any task",
        "userId":"6166b0b08233f0ae15d24803",
         "status":"start"
    };
    let options = {
      method: "POST",
      url: `${url}/list/add `,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.User}`
      },
    };
      const { statusCode, body } = await request(options);
      console.log(statusCode, body);
  
      chai.assert.isNotNull(body);
      chai.assert.strictEqual(statusCode, 200);
  })
})


describe(" Admin API", ()=>{
  it("It should remove task from todolist of the users", async()=>{

    let data = {
     "id": "6166c8c7abdb20613d5d609f"
    };
    let options = {
      method: "DELETE",
      url: `${url}/list/removetask`,
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.User}`
      },
    };
      const { statusCode, body } = await request(options);
      console.log(statusCode, body);
  
      chai.assert.isNotNull(body);
      chai.assert.strictEqual(statusCode, 200);
  })
})


describe(" ToDo API", ()=>{
  it("It should get  all the task of a user", async()=>{

    let options = {
      method: "GET",
      url: `${url}/list/allTasks/6166a3dd83011544de232c42`,
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer `+`${token.Admin}`
      },
    };
      const { statusCode } = await request(options);
      console.log(statusCode);
      chai.assert.strictEqual(statusCode, 200);
  })
})