const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const CoursePage = require("./../schemas/CoursePageSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const createNewPage = (req, res) => {
  let error = { error: undefined };
  let userJWT = req.headers.authorization.split(" ")[1];
  let pageName = req.body.pageName;
  let pageDescription = req.body.pageDescription || "";
  let sectionId = req.body.sectionId;

  jwt.verify(userJWT, secretOrKey, (err, decoded) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else if (!decoded.password || !decoded.id) {
      error.error = "jwt missing information";
      res.json(error);
    } else {
      let userId = decoded.id;
      userEncryptedPassword = decoded.password;

      User.findById(userId, (err, user) => {
        if (err) {
          error.error = err;
          res.json(error);
        } else if (!user) {
          error.error = "user not found";
          res.json(error);
        } else if (user.password !== userEncryptedPassword) {
          error.error = "could not authenticate user";
          res.json(error);
        } else {
          CourseSection.findById(sectionId, (err, section) => {
            if (err) {
              error.error = err;
              res.json(error);
            } else if (!section) {
              error.error = "section not found";
              res.json(error);
            } else {
              courseId = section.parentCourse;
              Course.findById(courseId, (err, course) => {
                if (err) {
                  error.error = err;
                  res.json(error);
                } else if (!course) {
                  error.error = "course not found";
                  res.json(error);
                } else if (String(course.author.authorRef) !== String(userId)) {
                  error.error = "user does not own course";
                  res.json(error);
                } else {
                  let newCoursePage = {
                    pageTitle: pageName,
                    pageDescription: pageDescription,
                    parentSection: sectionId,
                    elements: []
                  };
                  CoursePage.create(newCoursePage, (err, page) => {
                    if (err) {
                      error.error = err;
                      res.json(error);
                    } else if (!page) {
                      error.error = "page could not be created";
                      res.json(error);
                    } else {
                      let pageReference = {
                        _id: page._id,
                        pageTitle: page.pageTitle
                      };
                      CourseSection.findByIdAndUpdate(
                        sectionId,
                        {
                          $push: { pages: pageReference }
                        },
                        {
                          new: true
                        },
                        (err, section) => {
                          if (err) {
                            error.error = err;
                            res.json(error);
                          } else if (!section) {
                            error.error = "couldn't find section";
                            res.json(error);
                          } else {
                            console.log(section);
                            res.json(page);
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
    }
  });
};

module.exports = createNewPage;
