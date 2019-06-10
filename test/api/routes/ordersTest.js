process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const {app} = require("../../../server.js");
const {connect} = require("../../../server.js");

describe("Test all API endpoints for /orders", () => {
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
        user: "5cebe3b915bc5f35e43f18de"
      })
      .then(res => {
        const body = res.body;
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
