import mongoose from "mongoose";

// Interface that defines the structure of seperate docuement
interface IBlog {
  title: string;
  content: string;
  isGlobal: boolean;
  createdAt: Date;
  likes: number;
}

// Creating the schema
const blogSchema = new mongoose.Schema<IBlog>({
  title: String,
  content: String,
  isGlobal: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
  likes: Number,
});

// Defining and exporting the model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
