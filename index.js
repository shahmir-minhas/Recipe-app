// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const token = require("./utils/tokenGenerator");
var multer = require("multer");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
//cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// server/index.js
const path = require("path");

//multer file configurations
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/media/"));
    console.log(__dirname);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use('/media', express.static(path.join(__dirname, '/media')));

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./recipe-front/build")));

// ==============================================================================
// ========================== DB Connection and Modals =============================
// ==============================================================================

// mongoose connection
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});

const User = require("./Modals/Users");
const Recipe = require("./Modals/Recipes");

// ==============================================================================
// ========================== RestFul Api SignUp & Login =============================
// ==============================================================================
//TODO
app.route("/sign-up").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.json({ message: "user already exist", type: false });
    } else {
      const newUser = new User(req.body);
      newUser.save((err) => {
        err
          ? res.json({ message: "Sign up failed", type: false })
          : res.json({ message: "Sign Up successful", type: true });
      });
    }
  });
});

app.route("/login").post((req, res) => {
  console.log("req", req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (user) {
      User.findOne({ password: req.body.password }, (err, user) => {
        user
          ? res.json({
              message: "Logged in",
              type: true,
              login: true,
              userName: user.firstName,
              userId: user._id,
              token: token.getToken(),
            })
          : res.json({
              message: "Email or Password is incorrect",
              type: false,
            });
      });
    } else {
      res.json({ message: "Sign up first before login", type: false });
    }
    if (err) {
      console.log(err);
    }
  });
});

// ==============================================================================
// ========================== RestFul Api Recipe =============================
// ==============================================================================

app.route("/recipes").get((req, res) => {
  Recipe.find({}, (err, recipes) => {
    res.json(recipes);
  });
});
app.route("/recipes/:id").get((req, res) => {
  console.log(req.params);
  Recipe.find({ userId: req.params.id }, (err, recipes) => {
    res.json(recipes);
  });
});
app.route("/recipe/:id").get((req, res) => {
  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    err ? res.send(err) : res.json(recipe);
  });
});
app.post("/create-recipe", upload.single("file"), (req, res) => {
  const newRecipe = new Recipe({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    ingredients: req.body.ingredients,
    totalCost: req.body.totalCost,
    totalTimeReq: req.body.totalTimeReq,
    userId: req.body.userId,
    image: req.body.image,
  });
  console.log("new rec", newRecipe);
  newRecipe.save((err) => {
    err
      ? console.log(err)
      : res.json({ message: "new recipe created", type: true });
  });
});

app.post("/image-upload", upload.single("file"), (req, res) => {
  console.log("req body", req.file);

  res.json({ message: "calling firm img upload" });
});

app.route("/delete-recipe/:id").delete((req, res) => {
  Recipe.deleteOne({ _id: req.params.id }, (err, recipe) => {
    err ? res.send(err) : res.json({ message: "Recipe Deletd", type: true });
  });
});

app.patch("/rating/:id", (req, res) => {
  Recipe.updateOne({ _id: req.params.id }, { $set: req.body }, (err) => {
    err ? res.send(err) : res.send("update patch success");
  });
});
// ==============================================================================
// ========================== Server Listening =============================
// ==============================================================================

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./recipe-front/build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Recipe.findOneAndUpdate({ _id: req.params.id }, { rating: req.body });
// ------------------------------------------------------------------------------------------
// Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
//   console.log(recipe);
//   recipe.updateOne({ rating: req.body });
// });
