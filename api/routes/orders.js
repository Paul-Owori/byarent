const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");

router.get("/", (req, res, next) => {
  Order.find()
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  console.log("ORDERS RECEIVED BY BACKEND==>>", req.body);
  //This creates a new order object in the database using the order model
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    item_name: req.body.name,
    rentOrSale: req.body.rentOrSale,
    item_price: req.body.price,
    item_id: req.body.id,
    user_id: req.body.user_id,
    date: req.body.date
  });
  //This saves the order in the database
  order
    .save()
    .then(result => {
      //console.log(result);
      res.status(201).json({ order: order, result: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/user/:userID", (req, res, next) => {
  const id = req.params.userID;

  Order.find({ user_id: id })
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "Nothing found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:orderID", (req, res, next) => {
  const id = req.params.orderID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Order.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
