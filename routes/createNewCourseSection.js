const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const createNewCourseSection = (req, res) => {
  let error = { error: undefined };
  const userJWT = req.headers.authorization.split(" ")[1];
  jwt.verify(userJWT, secretOrKey, (err, decoded) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else {
      User.findById(decoded.id, (err, user) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (!user) {
          error.error = "could not find user";
          res.json(error);
        } else if (decoded.password !== user.password) {
          error.error = "user could not be verified";
          res.json(error);
        } else {
          Course.findById(req.body.courseId, (err, course) => {
            if (err) {
              error.error = err;
              res.json(error);
            } else if (!course) {
              error.error = "could not find course";
              res.json(error);
            } else if (String(course.author.authorRef) !== String(user._id)) {
              error.error = "user does not own course";
              res.json(error);
            } else {
              newCourseSection = {
                sectionTitle: req.body.title,
                parentCourse: req.body.courseId,
                pages: []
              };
              CourseSection.create(newCourseSection, (err, newSection) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else {
                  Course.findByIdAndUpdate(
                    req.body.courseId,
                    {
                      $push: {
                        "courseContent.sections": {
                          _id: newSection._id,
                          sectionTitle: newSection.sectionTitle
                        }
                      }
                    },
                    { new: true },
                    (err, updatedCourse) => {
                      if (err) {
                        error.error = err;
                        res.json(error);
                      } else {
                        res.json(
                          updatedCourse.courseContent.sections[
                            updatedCourse.courseContent.sections.length - 1
                          ]
                        );
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
  });
};

module.exports = createNewCourseSection;
