require("dotenv").config();

var cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,

  optionSuccessStatus: 200,
};

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const session = require("express-session");

const compression = require("compression");
const helmet = require("helmet");

// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
var blogPostRouter = require("./routes/blogPost");
var commentRouter = require("./routes/comment");
var userRouter = require("./routes/user");

var app = express();
app.use(cors()); // Use this after the variable declaration

const PORT = process.env.PORT || 3030;

let loginUsername = "";
let loginPassword = "";

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://admin:adminPassword@cluster0.3kvakkg.mongodb.net/odin-blog?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ type: "application/*" }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use(compression());

//passport
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "usernameInput",
      passwordField: "passwordInput",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.post("/login", passport.authenticate("local"), function (req, res, next) {
  if (req.user) {
    res.status(200).json("loggedIn");
  } else {
    res.status(404).json("not logged in");
  }
});

app.get("/authCheck", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(302).json("failed to get user");
  }
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.status(404).json();
    }
    res.status(200).json();
  });
});

app.use("/", indexRouter);
app.use("/", blogPostRouter);
app.use("/", commentRouter);
app.use("/", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
