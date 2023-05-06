var express = require("express");
var router = express.Router();

const blogPostController = require("../controllers/blogPostController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
