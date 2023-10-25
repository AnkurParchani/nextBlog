import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";
import Like from "../../../../models/likeModel";

import { getUser } from "../../../../utils/getUser";

export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();

  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please Login first"));

  const blogs = await Like.find()
    .where({ user: user._id })
    .populate({ path: "blog" });

  const blogsToShow = blogs.map((blog) => blog.blog);

  return NextResponse.json({ success: "success", blogs: blogsToShow });
});

export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Getting the blogId and user
  const { blogId } = await req.json();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const like = await Like.create({ blog: blogId, user: user._id });

  return NextResponse.json({ status: "success", like });
});
