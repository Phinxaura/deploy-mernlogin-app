const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
});

// Create a model
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
