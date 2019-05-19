const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  //Reject any files that are not images
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
  "itemImage",
  3
);

router.get("/", (req, res, next) => {
  Item.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No items found."
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

/*
router.post("/", upload.single("itemImage"), (req, res, next) => {
  console.log(req.file);
*/
router.post("/", upload, (req, res, next) => {
  //Get the paths of each of the images uploaded
  const imageArray = [...req.files];
  pathArray = imageArray.map((image, i, imageArray) => {
    return image.path;
  });

  //This creates a new item object in the database using the item model
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_image: [...pathArray]
  });
  //This saves the item in the database
  item
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /items",
        createditem: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:itemID", (req, res, next) => {
  const id = req.params.itemID;
  Item.findById(id)
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

router.patch("/:itemID", (req, res, next) => {
  const id = req.params.itemID;

  /*A function that allows us to update only one value at a time 
    where necessary instead of forcing us to update all or nothing*/

  const updateOps = {};
  for (const ops of req.body) {
    //I need to insert a delete image patch!!
    updateOps[ops.propName] = ops.value;
  }

  Item.update({ _id: id }, { $set: updateOps })
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
      To http://localhost:3000/items/5cd94a2179897f471c4dd0fd  make sure to mention the target id
     [
         {"propName": "name", "value": "Paul"}
     ]

     or 

     [
         {"propName": "price", "value": "12000"}
     ]
     
     */
});

router.delete("/:itemID", (req, res, next) => {
  //First we search for the item by its _id to allow us to delete its images from
  //the uploads folder
  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        //console.log("This is what you want to delete", doc);
        //First we extract the array of image paths
        const imagePath = [...doc.item_image];
        //console.log(imagePath);

        imagePath.forEach(element => {
          fs.unlinkSync(element); //Delete each image
        });

        //Then we extract the item _id and use that to help us delete the item itself
        Item.deleteOne({ _id: id })
          .exec()
          .then(result => {
            res
              .status(200)
              .json({
                message: "Item and all related data has been deleted",
                Result: result
              });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      } else {
        res.status(404).json({
          message: "Nothing found"
        });
      }
    });

  /*Item.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res
        .status(200)
        .json({ message: "Item has been deleted", Result: result });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });*/
});

module.exports = router;
