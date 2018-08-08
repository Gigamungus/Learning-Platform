const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursePageSchema = Schema({
  pageTitle: {
    type: String,
    required: true
  },
  pageDescription: String,
  parentCourse: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  },
  parentSection: {
    type: Schema.Types.ObjectId,
    ref: "CourseSchema"
  },
  elements: {
    type: Array,
    default: []
  }
});

module.exports = CoursePage = mongoose.model("CoursePage", coursePageSchema);
