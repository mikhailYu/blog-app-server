var express = require("express");
var router = express.Router();

const blogPostController = require("../controllers/blogPostController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

router.get("/signUp", userController.userSignUp_get);

router.post("/signUp", userController.userSignUp_post);

module.exports = router;
