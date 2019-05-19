const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creates a schema
const userSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  user_firstName: {
    type: String,
    required: true
  },
  user_lastName: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_password: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model("User", userSchema);
