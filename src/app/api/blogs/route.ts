import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import Blog from "../../../../models/blogModel";
import catchAsync from "../../../../utils/errors/catchAsync";
import AppError from "../../../../utils/errors/appError";

import { getUser } from "../../../../utils/auth/getUser";

// Getting all the blogs
export const GET = catchAsync(async () => {
  connectMongoDB();
  const blogs = await Blog.find().populate({ path: "user" });
  const blogsToShow = blogs.filter((blog) => blog.isGlobal).reverse();

  return NextResponse.json({
    status: "success",
    blogs: blogsToShow,
  });
});

// Creating a blog
export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { title, content, isGlobal } = await req.json();

  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const blog = await Blog.create({ title, content, user: user._id, isGlobal });
  return NextResponse.json({ status: "success", blog });
});
