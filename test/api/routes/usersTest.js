process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../app.js");
const conn = require("../../../db.js");

describe("Test all API endpoints for /users", () => {
  before(done => {
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

  it("Confirms that the users database collection is empty.", done => {
    request(app)
      .get("/users")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new user", done => {
    const env = process.env.NODE_ENV;
    request(app)
      .post("/users/signup")
      .send({
        firstName: "Paul",
        lastName: "Bob",
        email: "paul@bob.com",
        password: "password"
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

  it("logs in the new user", done => {
    request(app)
      .post("/users/signin")
      .send({
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const loginMessage = res.body.message;
        const status = res.status;
        expect(status).to.equal(200);
        expect(loginMessage).to.equal("User Logged In");
        done();
      });
  });

  it("Implements a patch on the new user object, changing their firstName", done => {
    request(app)
      .get("/users")
      .then(res => {
        const user_id = res.body[0]._id;
        const status = res.status;
        request(app)
          .patch(`/users/${user_id}`)
          .send([{ propName: "user_firstName", value: "NewName" }])
          .then(res => {
            const status2 = res.status;
            const modifiedCount = res.body.result.nModified;
            expect(status2).to.equal(200);
            expect(modifiedCount).to.equal(1);

            done();
          });
      });
  });

  it("Deletes the new user", done => {
    request(app)
      .get("/users")
      .then(res => {
        const user_id = res.body[0]._id;
        request(app)
          .delete(`/users/${user_id}`)
          .then(res => {
            const status2 = res.status;
            const deletedCount = res.body.deletedCount;
            expect(status2).to.equal(200);
            expect(deletedCount).to.equal(1);

            done();
          });
      });
  });
});
