import mongoose from "mongoose";
import User from "./userModel";

// Interface that defines the structure of seperate document
interface IBlog {
  title: string;
  content: string;
  isGlobal: boolean;
  createdAt: Date;
  likes: number;
  user: object;
}

// Creating the schema
const blogSchema = new mongoose.Schema<IBlog>({
  title: String,
  user: { type: mongoose.Schema.ObjectId, ref: User },
  content: String,
  isGlobal: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
  likes: Number,
});

// Defining and exporting the model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
