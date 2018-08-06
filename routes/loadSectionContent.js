const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const jwt = require("jsonwebtoken");

const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const loadSectionContent = (req, res) => {
  let error = { error: undefined };
  CourseSection.findById(req.params.sectionId, (err, section) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else {
      Course.findById(section.parentCourse, (err, course) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (!course) {
          error.error = "can't find course";
          res.json(error);
        } else {
          if (course.public) {
            res.json(section);
          } else {
            userJWT = req.headers.authorization.split(" ")[1];
            jwt.verify(userJWT, secretOrKey, (err, decoded) => {
              if (err) {
                error.error = err;
                res.json(error);
              } else if (!decoded.id) {
                error.error = "bad jwt";
                res.json(error);
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
                  } else if (
                    String(user._id) !== String(course.author.authorRef)
                  ) {
                    error.error = "user does not own course";
                  } else {
                    res.json(section);
                  }
                });
              }
            });
          }
        }
      });
    }
  });
};

module.exports = loadSectionContent;
