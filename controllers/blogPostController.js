const BlogPost = require("../models/blogPost");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.blogPost_list = asyncHandler(async (req, res, next) => {
  const allBlogPosts = await BlogPost.find({}).sort({ datePosted: -1 }).exec();

  res.json(allBlogPosts);
});

exports.blogPost_get = asyncHandler(async (req, res, next) => {
  await BlogPost.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        model: "User",
      },
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err) {
        res.status(404).send();
      }
    });
});

exports.blogPostCreate_post = asyncHandler(async (req, res, next) => {
  let newDate = new Date();

  const blogPost = new BlogPost({
    title: Object(req.body.title),
    datePosted: newDate,
    mainText: Object(req.body.mainText),
    published: Object(req.body.published),
  });

  await blogPost.save();

  res.json(blogPost.id);
});
exports.blogPostEdit_get = asyncHandler(async (req, res, next) => {
  res.send("Coming");
});

exports.blogPostEdit_post = asyncHandler(async (req, res, next) => {
  let newDate = new Date();

  const blogPost = new BlogPost({
    title: Object(req.body.title),
    dateUpdated: newDate,
    mainText: Object(req.body.mainText),
    published: Object(req.body.published),
    _id: Object(req.body.id),
  });

  await BlogPost.findByIdAndUpdate(Object(req.body.id), blogPost, {});

  res.json("Done");
});

exports.blogPostPushComment_post = asyncHandler(async (req, res, next) => {
  await BlogPost.findByIdAndUpdate(
    Object(req.body.id),
    { $push: { comments: Object(req.body.newCommentId) } },
    {}
  );

  res.json("Done");
});
exports.blogPostDelete_post = asyncHandler(async (req, res, next) => {
  await BlogPost.findByIdAndRemove(Object(req.body.id));

  res.json("Done");
});
