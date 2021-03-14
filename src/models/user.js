const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email inválido"],
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastname: {
    type: String,
    maxLength: 100,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
