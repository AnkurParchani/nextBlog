import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/catchAsync";
import AppError from "../../../../../utils/appError";
import Like from "../../../../../models/likeModel";

import { getUser } from "../../../../../utils/getUser";

// Getting all the liked blogs of user
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Authentication
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please Login first"));

  // Getting all the likes blogs of user
  const blogs = await Like.find()
    .where({ user: user._id })
    .populate({ path: "blog" });

  const blogsToShow = blogs.map((blog) => blog.blog);

  return NextResponse.json({ success: "success", blogs: blogsToShow });
});
