const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    year: Number,

    difficulty: String,

    question: String,

    options: [String],

    answer: String,

    explanation: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);