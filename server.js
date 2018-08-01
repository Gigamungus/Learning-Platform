const express = require("express");
const app = express();
let port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authStrat = require("./auth-strategy/jwtStrategy");
const passport = require("passport");
const secrets = {
  secret: process.env.secret || require("./config/passwords").secret,
  DBURL: process.env.DBURL || require("./config/secrets").DBURL
};
const DBURL = secrets.DBURL;

//serve react
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginUser");

//body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(authStrat);

mongoose.connect(
  DBURL,
  { useNewUrlParser: true },
  err => {
    if (err) console.log(err);
    else console.log("connected to database");
  }
);

app.post("/api/createuser", (req, res) => {
  createUser(req, res);
});

app.post("/api/loginuser", (req, res) => {
  loginUser(req, res);
});

const server = app.listen(port, () => {
  console.log(`serving app on port ${port}`);
});
