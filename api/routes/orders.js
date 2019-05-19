const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");

router.get("/", (req, res, next) => {
  Order.find()
    .exec()
    .then(docs => {
      console.log(docs);
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
  //This creates a new product object in the database using the product model
  const product = new Order({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  //This saves the product in the database
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Order.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
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

router.patch("/:productID", (req, res, next) => {
  const id = req.params.productID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
  /*So to patch an entry, you have to tailor your input from the front end into something like this;
      To http://localhost:3000/products/5cd94a2179897f471c4dd0fd  make sure to mention the target id
     [
         {"propName": "name", "value": "Paul"}
     ]

     or 

     [
         {"propName": "price", "value": "12000"}
     ]
     
     */
});

router.delete("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Order.remove({ _id: id })
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
