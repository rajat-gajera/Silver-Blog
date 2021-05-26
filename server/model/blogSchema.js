const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: String, required: true },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
