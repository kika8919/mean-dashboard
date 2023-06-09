"use strict";
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const User = mongoose.model("user");
const passport = require("passport");
const { uuid } = require("uuidv4");
const authController = {};

authController.login = async (req, res, next) => {
  try {
    if (!req.body.user.email) {
      return res.status(422).json({ error: "email can't be blank" });
    }

    if (!req.body.user.password) {
      return res.status(422).json({ error: "password can't be blank" });
    }

    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (user) {
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json({ info });
      }
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

authController.register = async (req, res, next) => {
  try {
    const user = new User();
    user.userId = uuid();
    user.firstName = req.body.user.firstName;
    user.lastName = req.body.user.lastName;
    user.email = req.body.user.email.toLowerCase();

    user.setPassword(req.body.user.password);

    user
      .save()
      .then((user) => {
        return res.json({
          status: "success",
          user: user.registerJSON(),
        });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports = { authController };
