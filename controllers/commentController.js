const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.commentCreate_get = asyncHandler(async (req, res, next) => {
  res.send("coming");
});

exports.commentCreate_post = asyncHandler(async (req, res, next) => {
  let newDate = new Date();
  const comment = new Comment({
    text: Object(req.body.text),
    datePosted: newDate,
    userId: Object(req.body.userId),
    postId: Object(req.body.postId),
  });

  await comment.save();

  res.json(comment.id);
});

exports.commentDelete_post = asyncHandler(async (req, res, next) => {
  res.send("Coming");
});
