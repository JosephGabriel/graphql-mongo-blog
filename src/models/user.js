const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

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

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.generateToken = async function () {
  let user = this;
  let token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  user.token = token;
  return user.save();
};

userSchema.methods.comparePassword = async function (userPassword) {
  let user = this;

  return bcrypt.compare(userPassword, user.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
