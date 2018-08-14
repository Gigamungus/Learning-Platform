const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const CoursePage = require("./../schemas/CoursePageSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const getPageContent = (req, res) => {
  console.log(req.params);
  let error = { error: undefined };
  let pageId = req.params.pageId;
  CoursePage.findById(pageId, (err, page) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else if (!page) {
      error.error = "could not find page";
      res.json(error);
    } else {
      let sectionId = page.parentSection;
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
            } else if (course.public) {
              res.json(page);
            } else {
              jwt.verify(
                req.headers.authorization.split(" ")[1],
                secretOrKey,
                (err, decoded) => {
                  if (err) {
                    error.error = err;
                    res.json(error);
                  } else if (!decoded.id || !decoded.password) {
                    error.error = "jwt missing information";
                    res.json(error);
                  } else {
                    User.findById(decoded.id, (err, user) => {
                      if (err) {
                        error.error = err;
                        res.json(error);
                      } else if (!user) {
                        error.error = "user could not be authenticated";
                        res.json(error);
                      } else if (
                        String(user._id) !== String(course.author.authorRef)
                      ) {
                        error.error = "user does not own course";
                        res.json(error);
                      } else if (decoded.password !== user.password) {
                        error.error = "user could not be authenticated";
                        res.json(error);
                      } else {
                        res.json(page);
                      }
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
};

module.exports = getPageContent;
