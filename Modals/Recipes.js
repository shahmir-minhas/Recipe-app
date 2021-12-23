const mongoose = require("mongoose");

const recipeSchema = {
  image: String,
  title: String,
  content: String,
  author: String,
  userId: String,

  ingredients: String,
  steps: String,
  totalCost: Number,
  totalTimeReq: Number,
  rating: Number,
  created: { type: Date, default: Date.now },
};

// Article Modal

module.exports = mongoose.model("Recipe", recipeSchema);
