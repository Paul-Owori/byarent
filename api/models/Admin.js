const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const adminSchema = new Schema({
  admin_id: mongoose.Schema.Types.ObjectId,
  admin_firstName: {
    type: String,
    required: true
  },
  admin_lastName: {
    type: String,
    required: true
  },
  admin_email: {
    type: String,
    required: true
  },
  admin_salt: {
    type: String,
    required: true
  },
  admin_hash: {
    type: String,
    required: true
  }
});

adminSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular admin
  this.admin_salt = crypto.randomBytes(16).toString("hex");

  // hashing admin's salt and password with 1000 iterations, 64 length and sha512 digest

  this.admin_hash = crypto
    .pbkdf2Sync(password, this.admin_salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

adminSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.admin_salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.admin_hash === hash;
};

module.exports = Admin = mongoose.model("Admin", adminSchema);
