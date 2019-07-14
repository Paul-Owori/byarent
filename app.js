const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("./api/routes/orders");
const itemRoutes = require("./api/routes/items");
const userRoutes = require("./api/routes/users");
const adminRoutes = require("./api/routes/admins");

const path = require("path");
//Middleware for uploading files to the backend
const fileUpload = require("express-fileupload");
//Load environmental variables
require("dotenv").config();

const app = express();

//file uploader middleware
app.use(fileUpload());
//bodyParser middleware
app.use(bodyParser.json());

//Routes
app.use("/orders", orderRoutes);
app.use("/items", itemRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);

//Deploying conditions
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

module.exports = app;
