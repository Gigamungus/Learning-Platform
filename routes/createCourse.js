const Course = require("../schemas/CourseSchema");
const User = require("./../schemas/UserSchema");
const jwt = require("jsonwebtoken");
const secretOrKey =
  process.env.secretOrKey || require("./../config/secrets").secret;

const createCourse = (req, res) => {
  let error = { error: undefined };
  jwt.verify(
    req.headers.authorization.split(" ")[1],
    secretOrKey,
    (err, userInfo) => {
      if (err) {
        error.error = err;
        res.json(error);
      } else {
        User.findById(userInfo.id).then(user => {
          if (!user) {
            error.error = "user not found...wha?";
            res.json(error);
          } else {
            Course.create(
              {
                author: {
                  name: user.username,
                  authorRef: user._id
                }
              },
              (err, course) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else {
                  res.json(course);
                }
              }
            );
          }
        });
      }
    }
  );
};

module.exports = createCourse;
