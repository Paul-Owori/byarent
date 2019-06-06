const express = require("express");
const bodyParser = require("body-parser");
const orderRoutes = require("./api/routes/orders");
const itemRoutes = require("./api/routes/items");
const userRoutes = require("./api/routes/users");
const adminRoutes = require("./api/routes/admins");

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//Routes
app.use("/orders", orderRoutes);
app.use("/items", itemRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);

//static files(images)
app.use("/uploads", express.static("uploads"));

module.exports = app;
