const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  Admin.find()
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

//To signup a new admin
router.post("/signup", (req, res, next) => {
  let admin = new Admin();
  admin.admin_firstName = req.body.firstName;
  admin.admin_lastName = req.body.lastName;
  admin.admin_email = req.body.email;
  admin.setPassword(req.body.password);

  //This saves the admin in the database
  admin
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /admins",
        createdAdmin: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//To login an admin
router.post("/signin", (req, res) => {
  // find admin with requested email
  //receives two parameters, admin email and password
  Admin.findOne({ admin_email: req.body.email }, function(err, admin) {
    if (admin === null) {
      return res.status(400).send({
        message: "Admin not found."
      });
    } else {
      if (admin.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "Admin Logged In"
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password"
        });
      }
    }
  });
});

router.get("/:adminID", (req, res, next) => {
  const id = req.params.adminID;
  Admin.findById(id)
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

router.patch("/:adminID", (req, res, next) => {
  const id = req.params.adminID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Admin.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:adminID", (req, res, next) => {
  const id = req.params.adminID;
  Admin.remove({ _id: id })
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
