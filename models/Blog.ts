import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  sub_heading: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
