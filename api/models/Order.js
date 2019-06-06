const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  rentOrSale: {
    type: String,
    required: true,
    ref: "Item"
  },
  item_name: {
    type: String,
    required: true,
    ref: "Item"
  },
  item_price: { type: Number, ref: "Item" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: {
    type: String,
    required: true
  }
});

module.exports = Order = mongoose.model("Order", orderSchema);
