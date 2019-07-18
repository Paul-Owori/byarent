const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI;
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoServer = new MongoMemoryServer();

function connect() {
  return new Promise((resolve, reject) => {
    //If a test is runnning, the mock database, mockgoose will be used instead of mongoose
    if (process.env.NODE_ENV === "test") {
      mongoServer.getConnectionString().then(mongoUri => {
        const mongooseOpts = {
          // options for mongoose 4.11.3 and above
          useNewUrlParser: true
          //useMongoClient: true // remove this line if you use mongoose 5 and above
        };

        mongoose.connect(mongoUri, { useNewUrlParser: true });
        done();

        mongoose.connection.on("error", e => {
          if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(mongoUri, { useNewUrlParser: true });
          }
          console.log(e);
        });
      });
    }
    //Otherwise, the actual database is used
    else {
      const conn = mongoose
        .connect(DB_URI, {
          useNewUrlParser: true
        })
        .then((res, err) => {
          //const newStorage = res
          if (err) return reject(err);
          console.log("Database online");

          resolve();
        });
    }
  });
}

mongoose.connection.once("open", () => {
  console.log("CONNECTION DB==>>", mongoose.connection.client.s.url);
});

function close() {
  console.log("Database gone offline");
  return mongoose.disconnect();
}

module.exports = { connect, close };
