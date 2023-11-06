import { NextResponse } from "next/server";

import Blog from "../../../../../models/blogModel";
import connectMongoDB from "../../../../../lib/dbConnect";
import { getUser } from "../../../../../utils/auth/getUser";
import AppError from "../../../../../utils/errors/appError";
import handleApiError from "../../../../../utils/errors/handleApiError";
import Comment from "../../../../../models/commentModel";

// type for params
type BlogParams = {
  params: {
    blogId: string;
  };
};

// Getting a particular blog
export async function GET(req: Request, { params: { blogId } }: BlogParams) {
  try {
    connectMongoDB();

    const blog = await Blog.findById(blogId).populate("user");
    const comments = await Comment.find()
      .where({ blog: blogId })
      .populate("user");

    console.log("Loggin blog from the server side", blog);

    if (!blog.isGlobal)
      return NextResponse.json(new AppError(404, "No Blog found"));

    return NextResponse.json({ status: "success", blog, comments });
  } catch (err) {
    handleApiError(err);
  }
}

// Updating a particular blog
export async function PATCH(req: Request, { params: { blogId } }: BlogParams) {
  connectMongoDB();

  // Getting the user
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  // The data from the frontend
  const { title, content, likes, isGlobal } = await req.json();

  // Updating the blog if the blog belongs to the user
  const blog = await Blog.findByIdAndUpdate(blogId, {
    title,
    content,
    likes,
    isGlobal,
  }).where({ user: user._id });

  // If no blog found
  if (!blog) return NextResponse.json(new AppError(400, "No Blog to update"));

  // The response
  return NextResponse.json({ status: "success", blog });
}

// Deleting a particular blog
export async function DELETE(req: Request, { params: { blogId } }: BlogParams) {
  connectMongoDB();

  // Getting the user
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  // Finding if the blog exists and the blog belongs to the user or not
  const blog = await Blog.findByIdAndDelete(blogId).where({ user: user._id });

  // If no blog found
  if (!blog) return NextResponse.json(new AppError(400, "No Blog to delete"));

  // The response
  return NextResponse.json({ status: "success", message: "Blog deleted" });
}
