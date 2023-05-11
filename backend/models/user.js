import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name should have more than 3 characters"],
    maxlength: [20, "Name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
