//Configures the server port
const port = process.env.PORT || 5000;

//Configuring the database
const mongoose = require("mongoose");
const DB_URI =
  process.env.MONGODB_URI ||
  "_Insert MONGODB_URI";

//Configure mock database for testing purposes
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

//Dependencies that will be used to create the app
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

//Configuring when the test database should run vs when the actual database should run
export const connect = () => {
  return new Promise((resolve, reject) => {
    //If a test is runnning, the mock database, mockgoose will be used instead of mongoose
    if (process.env.NODE_ENV === "test") {
      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(config.db, { useNewUrlParser: true })
          .then((res, err) => {
            if (err) return reject(err);

            console.log("Mock database online");

            resolve();
          });
      });
    }
    //Otherwise, the actual database is used
    else {
      mongoose
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
};

//Starting the database
connect();

//Starting the app only if the database is running, particularly important
//for the image storage connections that only work after the database connects,
//which it does asynchronously

export const app = mongoose.connection.once("open", () => {
  console.log("CONNECTION DB==>>", mongoose.connection.client.s.url);

  //Routes
  const itemRoutes = require("./api/routes/items");
  const orderRoutes = require("./api/routes/orders");
  const userRoutes = require("./api/routes/users");
  const adminRoutes = require("./api/routes/admins");
  const imageRoutes = require("./api/routes/images");

  //The rest of the app

  //bodyParser middleware
  app.use(bodyParser.json());
  //Routes
  app.use("/orders", orderRoutes);
  app.use("/items", itemRoutes);
  app.use("/users", userRoutes);
  app.use("/admins", adminRoutes);
  app.use("/images", imageRoutes);

  //static files(images)
  app.use("/uploads", express.static("uploads"));

  //Deploying conditions
  //app.use(express.static(path.join(__dirname, 'client/build')));
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build/index.html"), function(
        err
      ) {
        if (err) {
          res.status(500).send(err);
        }
      });
    });
  } else {
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname + "/client/public/index.html"));
    });
  }

  app.listen(port, () => console.log(`Server started on port ${port}`));
});

app()
