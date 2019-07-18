const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item");

//Load environmental variables
require("dotenv").config();

//Setup Dropbox API
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");

const dbx = new Dropbox({
  accessToken: process.env.DBX_ACCESS_TOKEN,
  fetch: fetch
});

//Function to generate new names with the current date and time
//for images that will be stored.
nameGen = name => {
  return new Date().toISOString() + "." + name;
};

//ITEMS routes;

//Function to get all items
router.get("/", (req, res, next) => {
  //Find and return all items stored in the database
  Item.find()
    .exec()
    .then(items => {
      if (items.length) {
        let itemsWithLinks = [];
        items.forEach(item => {
          //item_image is field available on each item that contains an array
          //with all the names of the images associated with that item.
          //Since this function is usually called for a page where only one image will be displayed, we
          //only require one CDN. The function below fetches a CDN for one image from dropbox

          let imageName = item.item_image[0];

          dbx
            .filesGetTemporaryLink({
              path: `/${imageName}`
            })
            .then(function(response) {
              //The single link is stored in the field item_image along with the image name
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
                res.status(200).send(itemsWithLinks);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      } else {
        res.status(404).send({ Message: "No items found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Function for posting new Items

router.post("/", (req, res, next) => {
  //receivedImageArray is where all the received images will be placed after they are extracted from req.files
  //The npm package express-fileupload makes them available in req.files
  let receivedImageArray;

  //First we rename all the images before we save them in dropbox
  //newImageNameArray will contain all the new names of the images once renaming has been completed.
  let newImageNameArray = [];

  //Populate receivedImageArray with images received from req.files
  if (req.files.itemImage.length) {
    receivedImageArray = [...req.files.itemImage];
  } else {
    receivedImageArray = [req.files.itemImage];
  }
  let imagesUploadedCount = [];

  receivedImageArray.forEach(image => {
    let newName = nameGen(image.name);
    newImageNameArray.push(newName);

    dbx
      .filesUpload({
        path: `/${newName}`,
        contents: image.data
      })
      .then(response => {
        imagesUploadedCount.push(newName);
      })
      .then(() => {
        if (imagesUploadedCount.length === newImageNameArray.length) {
          {
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
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.get("/:itemID", (req, res, next) => {
  //Function to get the details for the requested item
  const id = req.params.itemID;
  Item.findById(id)
    .exec()
    .then(item => {
      //Get CDN links  from dropbox for each image in the item_image field of the requested item
      let imageLinks = [];

      item.item_image.forEach(imageName => {
        dbx
          .filesGetTemporaryLink({
            path: `/${imageName}`
          })
          .then(function(response) {
            imageLinks.push({ imageName: imageName, imageLink: response.link });

            if (imageLinks.length === item.item_image.length) {
              //The image is only sent to the front end after all the CDNs have been
              //successfuly generated and stored in the item_image field
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

//Function to update an item
router.patch("/:itemID", (req, res, next) => {
  const id = req.params.itemID;

  //Function to process any images that will be added to the item
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

  //The images received arrive in the format [{imageName1, imageCDN1},{imageName2, imageCDN2}]
  //So the following generates a new array that only has the imageNames

  const oldImagesReceived = JSON.parse(req.body.oldImages);

  let oldImageNames = [];

  oldImagesReceived.forEach(imageItem => {
    oldImageNames.push(imageItem.imageName);
  });

  //A function for checking which images should be deleted by comparing the names of
  // the ones received to the names of the ones already in the store.
  arrayCompare = (arr1, arr2) => {
    arr3 = [];
    arr1.forEach(item => {
      if (arr2.includes(item) === false) {
        arr3.push(item);
      }
    });
    return arr3;
  };

  //FInd the Item(not yet updated) in the store so we can check what images(old) it has attached to it
  Item.findById(id)
    .exec()
    .then(doc => {
      let oldImagesInStore = [...doc.item_image];
      //Compare the new image list to the old one to see if there are any images to delete
      const oldImagesToDelete = arrayCompare(oldImagesInStore, oldImageNames);

      let newImageArray;
      if (fileNameArray) {
        if (fileNameArray.length) {
          newImageArray = [...oldImageNames, ...fileNameArray];
        }
      } else {
        newImageArray = [...oldImageNames];
      }

      //If there are any images to delete, delete them by updating the item in the database,
      //then deleting the images from dropbox
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
