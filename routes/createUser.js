const User = require("./../schemas/UserSchema");
const bcrypt = require("bcrypt");
const secretOrKey = require("./../config/secrets").secret;

const createUser = (req, res) => {
  let error = { error: undefined };
  if (
    !req.body.username ||
    req.body.username.length < 2 ||
    req.body.username.length > 16
  ) {
    error.error = "invalid name supplied";
    res.json(error);
  } else if (!req.body.password) {
    error.error = "invalid password";
    res.json(error);
  } else {
    User.findOne(
      { username: req.body.username },
      (err, userWithSimilarUsername) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (userWithSimilarUsername) {
          error.error = "username taken";
          res.json(error);
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              error.error = err;
              res.json(error);
            } else
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else {
                  User.create(
                    {
                      username: req.body.username,
                      password: hash
                    },
                    (err, user) => {
                      if (err) {
                        error.error = err;
                        res.json(error);
                      } else {
                        res.json(user);
                      }
                    }
                  );
                }
              });
          });
        }
      }
    );
  }
};

module.exports = createUser;
