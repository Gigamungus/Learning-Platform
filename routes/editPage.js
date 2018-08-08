const User = require("./../schemas/UserSchema");
const Course = require("./../schemas/CourseSchema");
const CourseSection = require("./../schemas/CourseSectionSchema");
const CoursePage = require("./../schemas/CoursePageSchema");
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secret || require("./../config/secrets").secret;

const editPage = (req, res) => {
  let error = { error: undefined };
  let userJWT = req.headers.authorization.split(" ")[1];
  let pageId = req.params.pageId;
  let acceptableElementTypes = ["text", "image", "youtube-video"];
  if (
    req.body.newElement &&
    !acceptableElementTypes.includes(req.body.newElement.sectionType)
  ) {
    error.error = "unnsupported section type";
    res.json(error);
  } else {
    jwt.verify(userJWT, secretOrKey, (err, decoded) => {
      if (err) {
        error.error = err;
        res.json(error);
      } else {
        let userId = decoded.id;
        let userPasswordEncrypted = decoded.password;
        CoursePage.findById(pageId, (err, page) => {
          if (err) {
            error.error = err;
            res.json(error);
          } else if (!page) {
            error.error = "could not find page";
            res.json(error);
          } else {
            courseId = page.parentCourse;
            Course.findById(courseId, (err, course) => {
              if (err) {
                error.error = err;
                res.json(error);
              } else if (!course) {
                error.error = "could not find course";
                res.json(error);
              } else {
                courseOwner = course.author.authorRef;
                User.findById(userId, (err, user) => {
                  if (err) {
                    error.error = err;
                    res.json(error);
                  } else if (!user) {
                    error.error = "could not find user";
                    res.json(error);
                  } else if (String(userId) !== String(user._id)) {
                    error.error = "user does not own course";
                    res.json(error);
                  } else if (userPasswordEncrypted !== user.password) {
                    error.error = "could not authenticate user";
                    res.json(error);
                  } else {
                    let elements = page.elements.slice();
                    if (req.body.newElement) {
                      elements.push(req.body.newElement);
                    }
                    let newPage = {
                      pageTitle: req.body.pageTitle || page.pageTitle,
                      pageDescription:
                        req.body.pageDescription || page.pageDescription,
                      elements
                    };
                    CoursePage.findByIdAndUpdate(
                      pageId,
                      newPage,
                      { new: true },
                      (err, page) => {
                        if (err) {
                          error.error = err;
                          res.json(error);
                        } else if (!page) {
                          error.error = "could not find page";
                          res.json(error);
                        } else {
                          res.json(page);
                          CourseSection.findById(
                            page.parentSection,
                            (err, section) => {
                              if (err) {
                                error.error = err;
                                res.json(error);
                              } else if (!section) {
                                error.error = "could not find section";
                                res.json(error);
                              } else {
                                section.pages = section.pages.map(
                                  sectionPage => {
                                    return String(sectionPage._id) ===
                                      String(page._id)
                                      ? Object.assign(sectionPage, {
                                          pageTitle: page.pageTitle
                                        })
                                      : sectionPage;
                                  }
                                );
                                CourseSection.findByIdAndUpdate(
                                  page.parentSection,
                                  section,
                                  { new: true },
                                  (err, section) => {
                                    if (err) {
                                      error.error = err;
                                      res.json(error);
                                    } else if (!section) {
                                      error.error = "could not find section";
                                      res.json(section);
                                    }
                                  }
                                );
                              }
                            }
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
  }
};

module.exports = editPage;
