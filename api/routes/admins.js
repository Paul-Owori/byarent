const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  Admin.find()
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
      res.status(201).json(result);
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
      return res.status(404).send({
        message: "Admin not found."
      });
    } else {
      if (admin.validPassword(req.body.password)) {
        return res.status(200).send({
          _id: admin._id,
          admin_firstName: admin.admin_firstName,
          admin_lastName: admin.admin_lastName,
          admin_email: admin.admin_email
        });
      } else {
        return res.status(404).send({
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

  Admin.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:adminID", (req, res, next) => {
  const id = req.params.adminID;
  Admin.deleteOne({ _id: id })
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
