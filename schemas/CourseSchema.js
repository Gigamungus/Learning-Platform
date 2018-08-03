const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = Schema({
  title: String,
  author: String,
  views: Number,
  viewers: [
    {
      viewerRef: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  thumbnailImg: String,
  created: {
    type: Date,
    default: Date.now
  },
  courseContent: {
    sections: [
      {
        sectionRef: {
          type: Schema.Types.ObjectId,
          ref: "CourseSection"
        },
        sectionTitle: String,
        pages: [
          {
            pageRef: {
              type: Schema.Types.ObjectId,
              ref: "CoursePage"
            },
            pageTitle: String
          }
        ]
      }
    ]
  },
  tags: [String],
  public: Boolean,
  inDevelopment: Boolean
});

module.exports = Course = mongoose.model("Course", courseSchema);
