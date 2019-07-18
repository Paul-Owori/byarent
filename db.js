const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI;

function connect() {
  return new Promise((resolve, reject) => {
    //Connect to the database then resolve the promise
    const conn = mongoose
      .connect(DB_URI, {
        useNewUrlParser: true
      })
      .then((res, err) => {
        if (err) return reject(err);
        console.log("Database online");

        resolve();
      });
  });
}

function close() {
  console.log("Database gone offline");
  return mongoose.disconnect();
}

module.exports = { connect, close };
