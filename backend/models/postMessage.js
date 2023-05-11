import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  name: String,
  creator: { type: String, required: true },
  tags: [String],
  selectedFile: { type: String },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model(`PostMessage`, postSchema);

export default PostMessage;
