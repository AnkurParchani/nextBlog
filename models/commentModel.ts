import mongoose from "mongoose";
import Blog from "./blogModel";
import User from "./userModel";

// Interface that defines the structure of seperate document
interface IComment {
  content: object;
  isEdited: object;
  user: object;
  blog: object;
}

// Creating the schema
const commentSchema = new mongoose.Schema<IComment>({
  isEdited: { type: Boolean, default: false },
  content: {
    required: [true, "Comment should have some content"],
    type: String,
  },
  blog: { type: mongoose.Schema.ObjectId, ref: Blog },
  user: { type: mongoose.Schema.ObjectId, ref: User },
});

// Defining and exporting the model
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
