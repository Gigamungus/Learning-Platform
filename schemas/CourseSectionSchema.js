const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSectionSchema = Schema({
  sectionTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  parentCourse: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  pages: [
    {
      pageRef: {
        type: Schema.Types.ObjectId,
        ref: "CoursePage"
      },
      pageTitle: String,
      pageType: String
    }
  ]
});

module.exports = CourseSection = mongoose.model(
  "CourseSection",
  courseSectionSchema
);
