const mongoose = require("mongoose");

// 1. Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true   // no duplicate emails
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
}, { timestamps: true }); // adds createdAt

// 2. Create model
const User = mongoose.model("User", userSchema);

// 3. Export
module.exports = User;