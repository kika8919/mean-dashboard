"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    async (email, password, done) => {
      console.log(email, password);
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && user.validPassword(password)) {
        console.log("kkkk");
        return done(null, user);
      } else {
        return done(null, null, "password incorrect");
      }
    }
  )
);
