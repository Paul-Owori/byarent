const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const itemSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  item_name: {
    type: String,
    required: true
  },
  item_description: {
    type: String,
    required: true
  },
  item_price: {
    type: Number,
    default: 0,
    required: true
  },
  item_image: [
    {
      type: String,
      required: false
    }
  ],
  isSold: {
    type: Boolean,
    default: false
  },
  item_purchaseDetails: {
    address: {
      type: String,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true,
      default: 1
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 1
    },
    garage: {
      type: Number,
      required: true,
      default: 1
    },
    rent: {
      type: Boolean,
      default: false
    },
    sell: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = Item = mongoose.model("Item", itemSchema);
