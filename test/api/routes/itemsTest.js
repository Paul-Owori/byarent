process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");

// const { conn } = require("../../../db.js");
// const { close } = require("../../../db.js");
const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer();
const app = require("../../../app.js");
const fs = require("fs");

describe("Test all API endpoints for /item", () => {
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
    let purchaseDetails = {
      garage: 1,
      bedrooms: 1,
      bathrooms: 1,
      address: "Alta",
      sell: false,
      rent: true
    };
    request(app)
      .post("/items/")
      .set("Accept", "application/form-data")
      .field("item_name", "House1")
      .field("item_price", "120000")
      .field("isSold", false)
      .field("item_description", "A big house")
      .field("garage", 1)
      .field("bedrooms", 1)
      .field("bathrooms", 1)
      .field("address", "Alta")
      .field("sell", false)
      .field("rent", true)
      //.field("item_purchaseDetails", purchaseDetails)
      .attach("itemImage", "test/api/routes/testImages/039alta.jpg")
      // .attach("itemImage", "/test/api/routes/testImages/039alta.jpg")
      .then(res => {
        const body = res.body;
        const status = res.status;

        expect(status).to.equal(201);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("item_name");
        expect(body).to.contain.property("item_description");
        expect(body).to.contain.property("item_image");
        expect(body).to.contain.property("isSold");
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

            const status = res.status;
            const deletedCount = res.body.deletedCount;
            expect(status).to.equal(200);
            expect(deletedCount).to.equal(1);

            done();
          });
      });
  });
});
