const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    username: String,

    score: Number,

    totalQuestions: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Score",
  scoreSchema
);