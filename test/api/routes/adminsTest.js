process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");

//const conn = require("../../../db.js");

const { theApp } = require("../../../server.js");
const { conn } = require("../../../server.js");
const { close } = require("../../../server.js");

describe("Test all API endpoints for /admin", () => {
  before(done => {
    conn()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    close()
      .then(() => done())
      .catch(err => done(err));
  });

  it("Confirms that the admin database collection is empty.", done => {
    request(theApp)
      .get("/admins")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new admin", done => {
    request(theApp)
      .post("/admins/signup")
      .send({
        firstName: "Paul",
        lastName: "Bob",
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("admin_firstName");
        expect(body).to.contain.property("admin_lastName");
        expect(body).to.contain.property("admin_email");
        expect(body).to.contain.property("admin_salt");
        expect(body).to.contain.property("admin_hash");
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
    request(theApp)
      .post("/admins/signin")
      .send({
        email: "paul@bob.com",
        password: "password"
      })
      .then(res => {
        const loginMessage = res.body.message;
        const status = res.status;
        expect(status).to.equal(200);
        expect(loginMessage).to.equal("Admin Logged In");
        done();
      });
  });

  it("Implements a patch on the new admin object, changing their firstName", done => {
    request(theApp)
      .get("/admins")
      .then(res => {
        const admin_id = res.body[0]._id;
        const status = res.status;
        request(theApp)
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
    request(theApp)
      .get("/admins")
      .then(res => {
        const admin_id = res.body[0]._id;
        request(theApp)
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
