const mongoose = require("mongoose");

const userSchema = {
  authorId: String,
  recipeId: String,
  rating: Number,
  created: { type: Date, default: Date.now },
};

module.exports = mongoose.model("Rating", userSchema);
