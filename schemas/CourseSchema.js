const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = Schema({
  title: String,
  author: String,
  views: Number,
  thumbnailImg: String,
  created: {
    type: Date,
    default: Date.now
  },
  courseContent: [{ type: Schema.Types.ObjectId, ref: "CoursePage" }],
  tags: [String],
  public: Boolean,
  inDevelopment: Boolean
});

module.exports = Course = mongoose.model("Course", courseSchema);
