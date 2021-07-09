const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST message incorrectly", () => {
  it("it should return 403", done => {
    let agent = chai.request.agent('http://localhost:3001');
    agent
      .post('/auth/login')
      .send({ username: 'test', password: 'test12'} )
      .then(res => {
        return agent
          .post('/api/messages')
          .send({ recipientId: 3, text: 'test', conversationId: 1, sender: null })
        })
        .then((res) => {
          res.should.have.status(403);
        });
        done();
  });
});

describe("/POST message correctly", () => {
  it("it should return 200", done => {
    let agent = chai.request.agent('http://localhost:3001');
    agent
      .post('/auth/login')
      .send({ username: 'test', password: 'test12'} )
      .then(res => {
        return agent
          .post('/api/messages')
          .send({ recipientId: 1, text: 'test', conversationId: 4, sender: null })
        })
        .then((res) => {
          res.should.have.status(200);
        });
        done();
  });
});
