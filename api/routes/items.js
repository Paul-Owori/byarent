const express = require("express");
const router = express.Router();
//const { connect } = require("../../db");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const multer = require("multer");
const fs = require("fs");
// const Grid = require("gridfs-stream");
//const { DB } = require("../../db");

const { mongo, connection } = require("mongoose");
const Grid = require("gridfs-stream");
Grid.mongo = mongo;
var gfs = Grid(mongoose.connection.db);
//Grid.mongo = mongo;
//var gfs = Grid(conn.db);

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   //Reject any files that are not images
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
//   "itemImage",
//   8
// );

// set up connection to db for file storage
// const storage = require("multer-gridfs-storage")({
//   db: conn.db,
//   file: (req, file) => {
//     return {
//       //filename: file.originalname,
//       filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//       }
//     };
//   }
// });

// sets file input to single file
//const upload = multer({ storage: storage }).single("file");

// const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
//   "itemImage",
//   8
// );

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

router.get("/files/:filename", (req, res) => {
  console.log("FileName==>>", req.params.filename);
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
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

router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find files"
      });
    }
    return res.json(files);
  });
});

router.post("/files", upload, (req, res) => {
  console.log("Starting file upload");
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

router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id }, err => {
    if (err) return res.status(500).json({ success: false });
    return res.json({ success: true });
  });
});

////ITEMS:::

router.get("/", (req, res, next) => {
  console.log("REACHED BEGINNING OF REQUEST!!");
  Item.find()
    .exec()
    .then(docs => {
      console.log("JSON DOCS FROM ITEMS.JS=>", docs[0].item_image[0]);
      res.status(200).send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.post("/", upload.single("itemImage"), (req, res, next) => {
//   console.log(req.file);

router.post("/", upload, (req, res, next) => {
  //Get the paths of each of the images uploaded
  console.log("REACHED BEGINNING OF post!!");
  console.log(req.body);

  const imageArray = [...req.files];
  const fileNameArray = [];
  imageArray.forEach(image => {
    fileNameArray.push(image.filename);
  });

  //This creates a new item object in the database using the item model
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_image: [...fileNameArray],
    item_purchaseDetails: {
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      garage: req.body.garage,
      rent: req.body.rent,
      sell: req.body.sell
    }
  });

  //This saves the item in the database
  item
    .save()
    .then(result => {
      res.status(201).json({ result: result, message: "SUCCESS!" });
    })
    .catch(err => {
      console.log(err);
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

router.patch("/:itemID", upload, (req, res, next) => {
  const id = req.params.itemID;

  const imageArray = [...req.files];
  const fileNameArray = [];
  imageArray.forEach(image => {
    fileNameArray.push(image.filename);
  });

  const oldImagesReceived = JSON.parse(req.body.oldImages);
  const oldImagesInStore = [];

  //Checking which images should be deleted from the ones already in the store.
  arrayCompare = (arr1, arr2) => {
    arr3 = [];
    arr1.forEach(item => {
      if (arr2.includes(item) === false) {
        arr3.push(item);
      }
    });
    return arr3;
  };

  Item.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        oldImagesInStore.push(...doc.item_image);
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

  // router.delete("/:imageName", (req, res) => {
  // gfs.remove({ _id: req.params.imageName }, err => {
  //   if (err) return res.status(500).json({ success: false });
  //   return res.json({ success: true });
  // });
  // });

  setTimeout(() => {
    const oldImagesToDelete = arrayCompare(oldImagesInStore, oldImagesReceived);
    const newImageArray = [...oldImagesReceived, ...fileNameArray];
    console.log(newImageArray);
    oldImagesToDelete.forEach(image => {
      gfs.remove({ filename: image });
    });
    let updater = {
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_price: req.body.item_price,
      item_purchaseDetails: {
        address: req.body.address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        garage: req.body.garage,
        rent: req.body.rent,
        sell: req.body.sell
      },
      item_image: [...newImageArray]
    };

    setTimeout(() => {
      Item.updateMany({ _id: id }, updater)
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).json({ result: result, message: "SUCCESS!" });
        })
        .catch(err => {
          console.log(error);
          res.status(500).json({ error: err });
        });
    }, 100);
  }, 500);
});

router.patch("/buy/:itemID", (req, res, next) => {
  const id = req.params.itemID;

  // A function that allows us to update only one value at a time
  //   where necessary instead of forcing us to update all or nothing

  Item.updateOne({ _id: id }, { isSold: true })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:itemID", (req, res, next) => {
  //First we search for the item by its _id to allow us to delete its images from
  //the uploads folder
  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        //First we extract the array of image paths
        const imagePath = [...doc.item_image];
        //console.log(imagePath);

        imagePath.forEach(element => {
          gfs.remove({ filename: element });
        });

        //Then we extract the item _id and use that to help us delete the item itself
        Item.deleteOne({ _id: id })
          .exec()
          .then(result => {
            res.status(200).json(result);
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
});

module.exports = router;

/*
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
  8
);

router.get("/", (req, res, next) => {
  console.log("REACHED BEGINNING OF REQUEST!!");
  Item.find()
    .exec()
    .then(docs => {
      console.log("JSON DOCS FROM ITEMS.JS=>", docs[0].item_image[0]);
      res.status(200).send(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//
// router.post("/", upload.single("itemImage"), (req, res, next) => {
//   console.log(req.file);
//

router.post("/", upload, (req, res, next) => {
  //Get the paths of each of the images uploaded
  console.log("REACHED BEGINNING OF post!!");
  console.log(req.body);
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
    item_image: [...pathArray],
    item_purchaseDetails: {
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      garage: req.body.garage,
      rent: req.body.rent,
      sell: req.body.sell
    }
  });

  //This saves the item in the database
  item
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
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

router.patch("/:itemID", upload, (req, res, next) => {
  const id = req.params.itemID;

  const imageArray = [...req.files];
  const pathArray = imageArray.map((image, i, imageArray) => {
    return image.path;
  });

  const oldImagesReceived = JSON.parse(req.body.oldImages);
  const oldImagesInStore = [];

  //Checking which images should be deleted from the ones already in the store.
  arrayCompare = (arr1, arr2) => {
    arr3 = [];
    arr1.forEach(item => {
      if (arr2.includes(item) === false) {
        arr3.push(item);
      }
    });
    return arr3;
  };

  Item.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        oldImagesInStore.push(...doc.item_image);
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

  setTimeout(() => {
    const oldImagesToDelete = arrayCompare(oldImagesInStore, oldImagesReceived);
    const newImageArray = [...oldImagesReceived, ...pathArray];
    oldImagesToDelete.forEach(image => {
      fs.unlinkSync(image);
    });
    let updater = {
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_price: req.body.item_price,
      item_purchaseDetails: {
        address: req.body.address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        garage: req.body.garage,
        rent: req.body.rent,
        sell: req.body.sell
      },
      item_image: [...newImageArray]
    };

    setTimeout(() => {
      Item.updateMany({ _id: id }, updater)
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).json({ result: result, message: "SUCCESS!" });
        })
        .catch(err => {
          console.log(error);
          res.status(500).json({ error: err });
        });
    }, 100);
  }, 500);
});

router.patch("/buy/:itemID", (req, res, next) => {
  const id = req.params.itemID;

  // A function that allows us to update only one value at a time
  //   where necessary instead of forcing us to update all or nothing

  Item.updateOne({ _id: id }, { isSold: true })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ error: err });
    });
});

router.delete("/:itemID", (req, res, next) => {
  //First we search for the item by its _id to allow us to delete its images from
  //the uploads folder
  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
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
            res.status(200).json(result);
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
});

module.exports = router;
*/
