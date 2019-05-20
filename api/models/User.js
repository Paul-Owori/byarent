const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

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
  user_salt: {
    type: String,
    required: true
  },
  user_hash: {
    type: String,
    required: true
  }
});

userSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular user
  this.user_salt = crypto.randomBytes(16).toString("hex");

  // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest

  this.user_hash = crypto
    .pbkdf2Sync(password, this.user_salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.user_salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.user_hash === hash;
};

module.exports = User = mongoose.model("User", userSchema);
