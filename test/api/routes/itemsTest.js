process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const {app} = require("../../../server.js");
const {connect} = require("../../../server.js");

describe("Test all API endpoints for /item", () => {
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

  it("Confirms that the item database collection is empty.", done => {
    request(app)
      .get("/items")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(404);
        done();
      });
  });

  it("Creates a new item", done => {
    request(app)
      .post("/items/")
      .field("Content-Type", "multipart/form-data")
      .field("item_name", "House1")
      .field("item_price", "120000")
      .field("item_description", "A big house")
      .attach("itemImage", "test/api/routes/testImages/039alta.jpg")
      .attach("itemImage", "test/api/routes/testImages/053alta.jpg")
      .then(res => {
        const body = res.body;
        const status = res.status;
        expect(status).to.equal(201);

        // expect(body).to.contain.property("_id");
        // expect(body).to.contain.property("item_name");
        // expect(body).to.contain.property("item_description");
        // expect(body).to.contain.property("item_image");
        // expect(body).to.contain.property("isSold");
        done();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  it("Deletes the new item", done => {
    request(app)
      .get("/items")
      .then(res => {
        const item_id = res.body[0]._id;
        request(app)
          .delete(`/items/${item_id}`)
          .then(res => {
            //console.log("ITEM RESPONSE => ", res.body);

            const status2 = res.status;
            const deletedCount = res.body.deletedCount;
            expect(status2).to.equal(200);
            expect(deletedCount).to.equal(1);

            done();
          });
      });
  });
});
