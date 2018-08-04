const Heap = require("heap");
const Courses = require("./../schemas/CourseSchema");
const evalluateCourse = course => {
  return (
    (course.views + 1) / (Math.sqrt(Date.now() - course.created) + 86400000)
  );
};
const evalluateCourses = (course1, course2) => {
  return evalluateCourse(course1) - evalluateCourse(course2);
};

const getRelevantCourses = (req, res) => {
  let error = {
    error: undefined
  };
  Courses.find({ public: true }).then((courses, err) => {
    if (err) {
      error.error = err;
      res.json(error);
    } else {
      res.json(Heap.nlargest(courses, req.params.howMany, evalluateCourses));
    }
  });
};

module.exports = getRelevantCourses;
