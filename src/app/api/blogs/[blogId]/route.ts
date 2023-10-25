import { NextResponse } from "next/server";

import Blog from "../../../../../models/blogModel";
import connectMongoDB from "../../../../../lib/dbConnect";
import { getUser } from "../../../../../utils/getUser";
import AppError from "../../../../../utils/appError";

// type for params
type BlogParams = {
  params: {
    blogId: string;
  };
};

// Getting a particular blog
export async function GET(req: Request, { params: { blogId } }: BlogParams) {
  connectMongoDB();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const blog = await Blog.findById(blogId);

  return NextResponse.json({ status: "success", blog });
}

// Deleting a particular blog
export async function DELETE(req: Request, { params: { blogId } }: BlogParams) {
  connectMongoDB();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  await Blog.findByIdAndDelete(blogId);

  return NextResponse.json({ status: "success", message: "Blog deleted" });
}

// Updating a particular blog
export async function PATCH(req: Request, { params: { blogId } }: BlogParams) {
  connectMongoDB();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const { title, content, likes, isGlobal } = await req.json();
  const blog = await Blog.findByIdAndUpdate(blogId, {
    title,
    content,
    likes,
    isGlobal,
  });

  return NextResponse.json({ status: "success", blog });
}
