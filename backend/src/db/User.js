const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.mongo.ObjectId,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  like: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

module.exports = User
