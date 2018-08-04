const User = require("./../schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const loginUser = (req, res) => {
  let error = { error: undefined };
  if (!req.body.username) {
    error.error = "no username provided";
    res.json(error);
  } else if (!req.body.password) {
    error.error = "no password provided";
    res.json(error);
  } else {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        err.error = err;
        res.json(error);
      } else if (!user) {
        error.error = "invalid username or password";
        res.json(error);
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) {
            err.error = err;
            res.json(error);
          } else if (!match) {
            error.error = "invalid username or password";
            res.json(error);
          } else {
            jwt.sign(
              {
                username: user.username,
                password: user.password,
                id: user._id,
                exp: Math.floor(Date.now() / 1000) + 31557600
              },
              secretOrKey,
              (err, token) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else {
                  res.json({ jwt: token });
                }
              }
            );
          }
        });
      }
    });
  }
};

module.exports = loginUser;
