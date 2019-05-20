const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const crypto = require("crypto");

router.get("/", (req, res, next) => {
  User.find()
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

//To signup a new user
router.post("/signup", (req, res, next) => {
  let user = new User();
  user.user_firstName = req.body.firstName;
  user.user_lastName = req.body.lastName;
  user.user_email = req.body.email;
  user.setPassword(req.body.password);

  //This saves the user in the database
  user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /users",
        createduser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//To login a user
router.post("/signin", (req, res) => {
  // find user with requested email
  //receives two parameters, user email and password
  User.findOne({ user_email: req.body.email }, function(err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found."
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "User Logged In"
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password"
        });
      }
    }
  });
});

router.get("/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.findById(id)
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

router.patch("/:userID", (req, res, next) => {
  const id = req.params.userID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  User.update({ _id: id }, { $set: updateOps })
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

router.delete("/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.remove({ _id: id })
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
