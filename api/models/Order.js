const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const orderSchema = new Schema({
  order_id: mongoose.Schema.Types.ObjectId,
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  item_name: {
    type: String,
    required: true
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = Order = mongoose.model("Order", orderSchema);
