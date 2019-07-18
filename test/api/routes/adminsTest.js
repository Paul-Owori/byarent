const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../../app.js");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer();

describe("Test all API endpoints for /admin", () => {
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

  it("Confirms that the admin database collection is empty.", done => {
    request(app)
      .get("/admins")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new admin", done => {
    request(app)
      .post("/admins/signup")
      .send({
        firstName: "Paul",
        lastName: "Bob",
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const status = res.status;
        expect(201).to.equal(201);
        done();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  it("logs in the new admin", done => {
    request(app)
      .post("/admins/signin")
      .send({
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(200);
        expect(body).to.contain.property("admin_firstName");
        expect(body).to.contain.property("admin_lastName");
        expect(body).to.contain.property("admin_email");
        done();
      });
  });

  it("Implements a patch on the new admin object, changing their firstName", done => {
    request(app)
      .get("/admins")
      .then(res => {
        const admin_id = res.body[0]._id;
        const status = res.status;
        request(app)
          .patch(`/admins/${admin_id}`)
          .send([{ propName: "admin_firstName", value: "NewName" }])
          .then(res => {
            const status2 = res.status;
            const modifiedCount = res.body.result.nModified;
            expect(status2).to.equal(200);
            expect(modifiedCount).to.equal(1);

            done();
          });
      });
  });

  it("Deletes the new admin", done => {
    request(app)
      .get("/admins")
      .then(res => {
        const admin_id = res.body[0]._id;
        request(app)
          .delete(`/admins/${admin_id}`)
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
