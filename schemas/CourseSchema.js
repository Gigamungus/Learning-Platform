const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = Schema({
  title: {
    type: String,
    default: ""
  },
  author: {
    name: {
      type: String,
      required: true
    },
    authorRef: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  description: {
    type: String,
    default: ""
  },
  views: {
    type: Number,
    default: 0
  },
  viewers: [
    {
      viewerRef: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  thumbnailImg: {
    type: String,
    default: "https://i.ytimg.com/vi/GD6qtc2_AQA/maxresdefault.jpg"
  },
  created: {
    type: Date,
    default: Date.now
  },
  courseContent: {
    sections: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "CourseSection"
        },
        sectionTitle: String
      }
    ]
  },
  tags: [String],
  public: {
    type: Boolean,
    default: false
  },
  inDevelopment: {
    type: Boolean,
    default: true
  }
});

module.exports = Course = mongoose.model("Course", courseSchema);
