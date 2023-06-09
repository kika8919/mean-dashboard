"use strict";
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const uniqueValidator = require("mongoose-unique-validator");
const secret = process.env.SECRET;

const UserSchema = new mongoose.Schema(
  {
    email: { required: [true, " can't be blank"], type: String, unique: true },
    firstName: { required: [true, " can't be blank"], type: String },
    lastName: { required: [true, " can't be blank"], type: String },
    userId: { required: true, type: String },

    hash: String,
    salt: String,
    contactNo: { default: "", type: String },
    city: { default: "", type: String },
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 1);

  return jwt.sign(
    {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.toLowerCase(),
      //   isAdmin: this.isAdmin,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email.toLowerCase(),
    userId: this.userId,
    token: this.generateJWT(),
    contactNo: this.contactNo,
    city: this.city,
  };
};

UserSchema.methods.registerJSON = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email.toLowerCase(),
  };
};

module.exports = mongoose.model("user", UserSchema);
