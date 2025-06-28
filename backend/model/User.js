const mongoose = require("mongoose");

const User_Schema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User_DB = mongoose.model("user", User_Schema);

module.exports = User_DB;
