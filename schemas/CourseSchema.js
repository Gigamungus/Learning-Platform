const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = Schema({
    title: String,
    author: String,
    views: Number,
    thumbnailImg: String,
    
});

module.exports = Course = mongoose.model("courses", courseSchema);
