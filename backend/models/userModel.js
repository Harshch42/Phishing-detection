const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
