const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const orderRoutes = require("./api/routes/orders");
const itemRoutes = require("./api/routes/items");
const userRoutes = require("./api/routes/users");
const adminRoutes = require("./api/routes/admins");

const app = express();

//Body Parser middleware
app.use(bodyParser.json());

//Routes
app.use("/orders", orderRoutes);
app.use("/items", itemRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);

//static files(images)
app.use("/uploads", express.static("uploads"));

//Connect to mongodb
mongoose.connect(
  "mongodb://localhost:27017/byarent",
  { useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;

    console.log("Database online");
  }
);

//Configures the server port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
