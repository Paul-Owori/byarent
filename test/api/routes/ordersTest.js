process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer();
const app = require("../../../app.js");

describe("Test all API endpoints for /orders", () => {
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

  it("Confirms that the orders database collection is empty.", done => {
    request(app)
      .get("/orders")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new order", done => {
    request(app)
      .post("/orders")
      .send({
        name: "Big House",
        price: "120000",
        id: "5cebe3b915bc5f35e43f18de",
        user_id: "5cebe3b915bc5f35e43f18de",
        rentOrSale: "rent",
        date: new Date().toString()
      })
      .then(res => {
        const body = res.body.order;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("item_name");
        expect(body).to.contain.property("item_id");
        expect(body).to.contain.property("user_id");
        done();
      });
  });

  it("Deletes the new order", done => {
    request(app)
      .get("/orders")
      .then(res => {
        const order_id = res.body[0]._id;
        request(app)
          .delete(`/orders/${order_id}`)
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
