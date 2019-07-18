process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer();
const app = require("../../../app.js");

describe("Test all API endpoints for /users", () => {
  before(done => {
    const mongoServer = new MongoMemoryServer();
    const opts = { useNewUrlParser: true };

    mongoServer
      .getConnectionString()
      .then(mongoUri => {
        return mongoose.connect(mongoUri, opts, err => {
          if (err) done(err);
        });
      })
      .then(() => done());
  });

  after(() => {
    mongoose.disconnect();
    mongoServer.stop();
  });

  it("Confirms that the users database collection is empty.", done => {
    request(app)
      .get("/users")
      .then(res => {
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new user", done => {
    request(app)
      .post("/users/signup")
      .send({
        firstName: "Paul",
        lastName: "Bob",
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const status = res.status;
        const body = res.body.user;
        expect(status).to.equal(201);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("user_firstName");
        expect(body).to.contain.property("user_lastName");
        expect(body).to.contain.property("user_email");
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
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(200);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("user_firstName");
        expect(body).to.contain.property("user_lastName");
        expect(body).to.contain.property("user_email");
        done();
      });
  });

  it("Implements a patch on the new user object, changing their firstName", done => {
    request(app)
      .get("/users")
      .then(res => {
        const user_id = res.body[0]._id;

        request(app)
          .patch(`/users/${user_id}`)
          .send([{ propName: "user_firstName", value: "NewName" }])
          .then(res => {
            const status = res.status;
            const modifiedCount = res.body.result.nModified;
            expect(status).to.equal(200);
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
            const status = res.status;
            const deletedCount = res.body.deletedCount;
            expect(status).to.equal(200);
            expect(deletedCount).to.equal(1);

            done();
          });
      });
  });
});
