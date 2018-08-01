const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String
});

module.exports = User = mongoose.model("users", userSchema);
