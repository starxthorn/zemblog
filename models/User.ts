import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: "/avatar.jpeg",
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
