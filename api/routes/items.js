const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");

const dbx = new Dropbox({
  accessToken:
    "RxRWzkK6ykAAAAAAAAAANQfZTG5D-yjpBUU_f85zhyNqH36grW7ewP2dsHsqrdvQ",
  fetch: fetch
});

//Function to generate new names for stored images with the dates they were uploaded on

nameGen = name => {
  return new Date().toISOString() + "." + name;
};

////ITEMS:::

router.get("/", (req, res, next) => {
  console.log("REACHED BEGINNING OF REQUEST!!");
  Item.find()
    .exec()
    .then(items => {
      console.log("JSON items FROM ITEMS.JS=>", items);
      let itemsWithLinks = [];
      items.forEach(item => {
        let imageName = item.item_image[0];

        dbx
          .filesGetTemporaryLink({
            path: `/${imageName}`
          })
          .then(function(response) {
            //imageLinks.push(response.link);

            let actualItem = {
              _id: item._id,
              item_name: item.item_name,
              item_price: item.item_price,
              isSold: item.isSold,
              item_description: item.item_description,
              item_purchaseDetails: {
                bedrooms: item.item_purchaseDetails.bedrooms,
                bathrooms: item.item_purchaseDetails.bathrooms,
                garage: item.item_purchaseDetails.garage,
                rent: item.item_purchaseDetails.rent,
                sell: item.item_purchaseDetails.sell,
                address: item.item_purchaseDetails.address
              },
              item_image: [{ imageName: imageName, imageLink: response.link }]
            };
            itemsWithLinks.push(actualItem);
            if (itemsWithLinks.length === items.length) {
              console.log("The items==>>", itemsWithLinks);

              res.status(200).send(itemsWithLinks);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
      //res.status(200).send(items);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  //First we rename all the images and then save them in dropbox

  //newImageNameArray will contain all the new names of the images once renaming has been completed.
  let newImageNameArray = [];

  //receivedImageArray is where all the received images will be placed after they are extracted from req.files
  //The npm package express-fileupload makes them available in req.files
  let receivedImageArray;
  if (req.files.itemImage.length) {
    receivedImageArray = [...req.files.itemImage];
  } else {
    receivedImageArray = [req.files.itemImage];
  }

  receivedImageArray.forEach(image => {
    console.log("Actual file I'm sending==>", image);

    let newName = nameGen(image.name);
    newImageNameArray.push(newName);

    dbx
      .filesUpload({
        path: `/${newName}`,
        contents: image.data
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //This creates a new item object in the database using the item model
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    item_price: req.body.item_price,
    item_image: [...newImageNameArray],
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
      res.status(500).json({ error: err });
      console.log(err);
    });
});

router.get("/:itemID", (req, res, next) => {
  console.log("Trying to get item");
  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(item => {
      //Get links for each item
      let imageLinks = [];

      item.item_image.forEach(imageName => {
        dbx
          .filesGetTemporaryLink({
            path: `/${imageName}`
          })
          .then(function(response) {
            imageLinks.push({ imageName: imageName, imageLink: response.link });
            // console.log("A link was generated==>>", response.link);
            if (imageLinks.length === item.item_image.length) {
              //console.log("Finally got the stuff done with==>>", imageLinks);
              let actualItem = {
                _id: item._id,
                item_name: item.item_name,
                item_price: item.item_price,

                isSold: item.isSold,
                item_description: item.item_description,
                item_purchaseDetails: {
                  bedrooms: item.item_purchaseDetails.bedrooms,
                  bathrooms: item.item_purchaseDetails.bathrooms,
                  garage: item.item_purchaseDetails.garage,
                  rent: item.item_purchaseDetails.rent,
                  sell: item.item_purchaseDetails.sell,
                  address: item.item_purchaseDetails.address
                },
                item_image: [...imageLinks]
              };
              console.log("The item==>>", actualItem);

              res.status(200).send(actualItem);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:itemID", (req, res, next) => {
  const id = req.params.itemID;

  let imageArray;
  let fileNameArray;

  if (req.files) {
    if (req.files.itemImage.length) {
      imageArray = [...req.files.itemImage];
    } else {
      imageArray = [req.files.itemImage];
    }

    if (imageArray.length) {
      fileNameArray = [];
      imageArray.forEach(image => {
        let newName = nameGen(image.name);
        fileNameArray.push(newName);

        dbx
          .filesUpload({
            path: `/${newName}`,
            contents: image.data
          })
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
  //The images received arrive in the format [{imageName1, imageLink1},{imageName2, imageLink2}]
  //So the following generates a new array that only has the imageNames

  const oldImagesReceived = JSON.parse(req.body.oldImages);

  let oldImageNames = [];

  oldImagesReceived.forEach(imageItem => {
    oldImageNames.push(imageItem.imageName);
  });

  //A function for checking which images should be deleted from the ones already in the store.
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
      let oldImagesInStore = [...doc.item_image];

      const oldImagesToDelete = arrayCompare(oldImagesInStore, oldImageNames);

      let newImageArray;
      if (fileNameArray) {
        if (fileNameArray.length) {
          newImageArray = [...oldImageNames, ...fileNameArray];
        }
      } else {
        newImageArray = [...oldImageNames];
      }

      console.log(newImageArray);

      if (oldImagesToDelete.length) {
        oldImagesToDelete.forEach(image => {
          dbx
            .filesDelete({
              path: `/${image}`
            })
            .then(function(response) {
              console.log("Response ==>", response);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }

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
      return updater;
    })
    .then(updater => {
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
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//A route triggered only when an item is bought. It updates the item isSold status
//to show that its nolonger available
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
  //First we search for the item by its _id so that we can access its item_image array which
  //will give us the information necessary to allow us to delete its images from dropbox

  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(item => {
      if (item) {
        //First we extract the array of image paths
        const imagePath = [...item.item_image];

        //Then we delete each image from dropbox, one by one
        imagePath.forEach(image => {
          dbx
            .filesDelete({
              path: `/${image}`
            })
            .then(function(response) {
              console.log("Response ==>", response);
            })
            .catch(function(error) {
              console.log(error);
            });
        });

        //Then we use the item _id to help us delete the item itself
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
