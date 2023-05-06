var express = require("express");
var router = express.Router();

const commentController = require("../controllers/commentController");

router.get("/post/:id", commentController.commentCreate_get);

router.post("/post/:id/newMessage", commentController.commentCreate_post);

router.post("/post/:id/deleteComment", commentController.commentDelete_post);

module.exports = router;
