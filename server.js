const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const DBURL = require("./config/secrets").DBURL;
const bodyParser = require("body-parser");
const authStrat = require("./auth-strategy/jwtStrategy");
const passport = require("passport");

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
