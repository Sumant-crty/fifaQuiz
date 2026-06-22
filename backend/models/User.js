const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/, "Enter a valid email address (e.g. name@example.com)"]
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);