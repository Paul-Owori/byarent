const express = require("express");
const router = express.Router();
const { connect } = require("../../db");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const multer = require("multer");
const fs = require("fs");

const { mongo, connection } = require("mongoose");
const Grid = require("gridfs-stream");
Grid.mongo = mongo;
var gfs = Grid(mongoose.connection.db);

//Function to generate new names for stored images with the dates they were uploaded on
nameGen = name => {
  return new Date().toISOString() + "." + name;
};

let newStorage = require("multer-gridfs-storage")({
  db: mongoose.connection.db,
  file: (req, file) => {
    return {
      //filename: file.originalname,
      filename: nameGen(file.originalname)
    };
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

const upload = multer({
  storage: newStorage,
  fileFilter: fileFilter
}).array("itemImage", 8);

router.get("/:imageName", (req, res) => {
  console.log("imageName==>>", req.params.imageName);
  gfs.files.find({ filename: req.params.imageName }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    let readstream = gfs.createReadStream({
      //??
      filename: files[0].filename //??
    });
    res.set("Content-Type", files[0].contentType); //??
    return readstream.pipe(res); //??
  });
});

router.get("/", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find images"
      });
    }
    return res.json(files);
  });
});

router.post("/", upload, (req, res) => {
  console.log("Starting image upload");
  const imageArray = [...req.files];
  const fileNameArray = [];
  imageArray.forEach(image => {
    fileNameArray.push(image.filename);
  });
  console.log("file==>>", imageArray);
  if (req.files) {
    console.log("file ids==>>", fileNameArray);
    return res.json({
      success: true,
      randomOtherthins: "this",
      file: fileNameArray
    });
  }
  res.send({ success: false });
});

router.delete("/:imageName", (req, res) => {
  gfs.remove({ _id: req.params.imageName }, err => {
    if (err) return res.status(500).json({ success: false });
    return res.json({ success: true });
  });
});

module.exports = router;
