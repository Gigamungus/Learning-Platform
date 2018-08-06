const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const updateSectionDescription = (req, res) => {
  let error = { error: undefined };
  let userJWT = req.headers.authorization.split(" ")[1];
  let newDescription = req.body.newDescription;
  let sectionId = req.params.sectionId;

  jwt.verify(userJWT, secretOrKey, (err, decoded) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else if (!decoded.username || !decoded.password || !decoded.id) {
      error.error = "user's jwt did not contain user's data";
      res.json(error);
    } else {
      let userId = decoded.id;
      let userEncryptedPassword = decoded.password;
      CourseSection.findById(sectionId, (err, section) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (!section) {
          error.error = "could not find section";
          res.json(error);
        } else {
          let courseId = section.parentCourse;
          Course.findById(courseId, (err, course) => {
            if (err) {
              error.error = err;
              res.json(error);
            } else if (!course) {
              error.error = "could not find course";
              res.json(error);
            } else if (String(userId) !== String(course.author.authorRef)) {
              error.error = "user does not own course";
              res.json(error);
            } else {
              User.findById(userId, (err, user) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else if (!user) {
                  error.error = "could not find user";
                  res.json(error);
                } else if (userEncryptedPassword !== user.password) {
                  error.error = "could not authenticate user";
                  res.json(error);
                } else {
                  let updateDescription = {
                    description: newDescription
                  };
                  CourseSection.findByIdAndUpdate(
                    sectionId,
                    updateDescription,
                    {
                      new: true
                    },
                    (err, section) => {
                      if (err) {
                        error.error = err;
                        res.json(error);
                      } else if (!section) {
                        error.error = "could not find section";
                        res.json(error);
                      } else {
                        res.json({
                          newDescription: section.description
                        });
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

module.exports = updateSectionDescription;
