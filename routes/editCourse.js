const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const secretOrKey = require("./../config/secrets").secret;
const jwt = require("jsonwebtoken");

const editCourse = (req, res) => {
  let error = { error: undefined };
  if (req.body.JWT !== req.headers.authorization.split(" ")[1]) {
    error.error = "JWT from header does not match JWT from body";
    res.json(error);
  } else {
    jwt.verify(req.body.JWT, secretOrKey, (err, decodedJWT) => {
      if (err) {
        error.error = err;
        res.json(error);
      } else {
        User.findById(decodedJWT.id, (err, user) => {
          if (err) {
            error.error = err;
            res.json(error);
          } else if (!user) {
            error.error = "user not found";
            res.json(error);
          } else if (user.password !== decodedJWT.password) {
            error.error = "could not authenticate user";
            res.json(error);
          } else {
            Course.findById(req.params.courseId, (err, course) => {
              if (err) {
                error.error = err;
                res.json(error);
              } else if (String(course.author.authorRef) !== String(user._id)) {
                error.error = "user did not author course";
                res.json(error);
              } else {
                course.title = req.body.courseEdit.title;
                course.public = req.body.courseEdit.public;
                course.description = req.body.courseEdit.description;
                course.thumbnailImg = req.body.courseEdit.thumbnailImg;
                course.courseContent = req.body.courseEdit.courseContent;
                Course.findByIdAndUpdate(
                  req.params.courseId,
                  course,
                  { new: true },
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
        });
      }
    });
  }
};

module.exports = editCourse;
