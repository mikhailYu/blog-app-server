const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");

exports.userSignUp_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    console.log(true);
  } else {
    console.log(false);
  }
});

exports.userSignUp_post = async (req, res, next) => {
  const newUser = new User({
    username: Object(req.body.username),
    password: Object(req.body.password),
  });
  //redo this but with validator... in the next project
  await newUser.save().catch((err) => {
    if (err) {
      res.status(404).json("Error");
    }
  });
  res.status(200).json("Sent");
};
