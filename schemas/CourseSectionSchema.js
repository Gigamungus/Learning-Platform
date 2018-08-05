const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSectionSchema = Schema({
  sectionTitle: String,
  description: String,
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
