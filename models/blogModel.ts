import mongoose from "mongoose";
import User from "./userModel";
import Comment from "./commentModel";

// Interface that defines the structure of seperate document
interface IBlog {
  title: string;
  content: string;
  isGlobal: boolean;
  likes: number;
  img: string;
  comments: number;
  createdAt: Date;
  user: object;
}

// Creating the schema
const blogSchema = new mongoose.Schema<IBlog>({
  title: String,
  user: { type: mongoose.Schema.ObjectId, ref: User },
  likes: { type: Number, default: 0 },
  content: String,
  img: String,
  isGlobal: { type: Boolean, default: true },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

// Defining and exporting the model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
