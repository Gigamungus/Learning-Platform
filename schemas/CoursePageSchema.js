const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursePageSchema = Schema({
  pageTitle: String,
  parentCourse: { type: Schema.Types.ObjectId, ref: "Course" },
  elements: [{ elementType: String, elementContent: String }]
});

module.exports = CoursePage = mongoose.model("CoursePage", coursePageSchema);
