const mongoose = require("mongoose");

const userSchema = {
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: Number,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
};

// Article Modal

module.exports = mongoose.model("User", userSchema);
