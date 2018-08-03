const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSectionSchema = Schema({
  pages: [
    {
      pageRef: {
        type: Schema.Types.ObjectId,
        ref: "CoursePage"
      }
    }
  ]
});

module.exports = CourseSection = mongoose.model(
  "CourseSection",
  courseSectionSchema
);
