var express = require("express");
var router = express.Router();

const blogPostController = require("../controllers/blogPostController");

router.get("/posts", blogPostController.blogPost_list);

router.get("/post/:id", blogPostController.blogPost_get);

router.post("/post/create", blogPostController.blogPostCreate_post);

router.get("/post/:id/edit", blogPostController.blogPostEdit_get);

router.post("/post/:id/edit", blogPostController.blogPostEdit_post);

router.post(
  "/post/:id/newComment",
  blogPostController.blogPostPushComment_post
);

router.post("/post/:id/delete", blogPostController.blogPostDelete_post);

module.exports = router;
