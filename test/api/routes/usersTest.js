process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../app.js");
const conn = require("../../../db.js");

describe("POST /user", () => {
  before(done => {
    let nodeENV = process.env.NODE_ENV;
    nodeENV = "test";
    conn
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    conn
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  it("OK, creating a new user works", done => {
    const env = process.env.NODE_ENV;
    request(app)
      .post("/users/signup")
      .send({
        firstName: "BOBZILLA KILLA",
        lastName: "Pauloi",
        email: "paul@bob.com",
        password: "amazer"
      })
      .then(res => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("user_firstName");
        expect(body).to.contain.property("user_lastName");
        expect(body).to.contain.property("user_email");
        expect(body).to.contain.property("user_salt");
        expect(body).to.contain.property("user_hash");
        done();
      });
  });
});
