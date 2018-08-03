const Course = require("../schemas/CourseSchema");

const createCourse = (req, res) => {
  let error = { error: undefined };
  Course.create(
    {
      title: req.body.title,
      author: req.body.author,
      views: 0,
      thumbnailImg: req.body.thumbnailImg
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
};

module.exports = createCourse;
