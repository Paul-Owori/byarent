const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/byarent";
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

function connect() {
  return new Promise((resolve, reject) => {
    //If a test is runnning, the mock database, mockgoose will be used instead of mongoose
    if (process.env.NODE_ENV === "test") {
      mockgoose.prepareStorage().then(() => {
        mongoose.connect(DB_URI, { useNewUrlParser: true }).then((res, err) => {
          if (err) return reject(err);

          console.log("Mock database online");
          resolve();
        });
      });
    }
    //Otherwise, the actual database is used
    else {
      mongoose.connect(DB_URI, { useNewUrlParser: true }).then((res, err) => {
        if (err) return reject(err);
        console.log("Database online");
        resolve();
      });
    }
  });
}

function close() {
  console.log("Database gone offline");
  return mongoose.disconnect();
}

module.exports = { connect, close };
