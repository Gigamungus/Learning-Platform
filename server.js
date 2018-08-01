const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const DBURL = require("./config/secrets").DBURL;

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  DBURL,
  { useNewUrlParser: true },
  err => {
    if (err) console.log(err);
    else console.log("connected to database");
  }
);



const server = app.listen(port, () => {
  console.log(`serving app on port ${port}`);
});
