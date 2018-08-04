const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const getCourse = (req, res) => {
  let error = { error: undefined };
  Course.findById(req.params.courseId, (err, course) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else if (!course) {
      error.error = "course not found";
    } else {
      if (course.public) {
        res.json(course);
      } else {
        if (!req.headers.authorization) {
          error.error = "this course is private";
          res.json(error);
        } else {
          jwt.verify(
            req.headers.authorization,
            secretOrKey,
            (err, decodedJWT) => {
              if (err) {
                error.error = err;
                res.json(error);
              } else {
                User.findById(decodedJWT.id, (err, user) => {
                  if (err) {
                    error.error = err;
                    res.json(error);
                  } else {
                    if (user.password !== decodedJWT.password) {
                      error.error = "user user password does not match";
                      res.json(error);
                    } else {
                      res.json(course);
                    }
                  }
                });
              }
            }
          );
        }
      }
    }
  });
};

module.exports = getCourse;
