const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const getSections = (req, res) => {
  let error = { error: undefined };
  let courseId = req.params.courseId;
  let userJWT = req.headers.authorization.split(" ")[1];
  jwt.verify(userJWT, secretOrKey, (err, decoded) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else if (!decoded.id || !decoded.password) {
      error.error = "jwt missing information";
      res.json(error);
    } else {
      Course.findById(courseId, (err, course) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (!course) {
          error.error = "could not find course";
          res.json(error);
        } else if (course.public) {
          res.json(course.courseContent.sections);
        } else {
          User.findById(decoded.id, (err, user) => {
            if (err) {
              error.error = err;
              res.json(error);
            } else if (!user) {
              error.error = "could not find user";
              res.json(error);
            } else if (user.password !== decoded.password) {
              error.error = "could not authenticate user";
              res.json(error);
            } else if (String(user._id) !== String(course.author.authorRef)) {
              error.error = "user does not own course";
              res.json(error);
            } else {
              res.json(course.courseContent.sections);
            }
          });
        }
      });
    }
  });
};

module.exports = getSections;
