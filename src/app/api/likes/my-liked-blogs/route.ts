import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/errors/catchAsync";
import AppError from "../../../../../utils/errors/appError";
import Like from "../../../../../models/likeModel";

import { getUser } from "../../../../../utils/auth/getUser";

// Getting all the liked blogs of user
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();
  // Authentication
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please Login first"));

  // Getting all the likes blogs of user
  const blogs = await Like.find()
    .where({ user: user._id })
    .populate({ path: "blog", populate: { path: "user" } });

  const blogsToShow = blogs
    .map((blog) => blog.blog)
    .filter((blog) => blog !== null);

  return NextResponse.json({
    status: "success",
    blogs: blogsToShow,
  });
});

// Dummy POST handler to make it dynamic route
export async function POST(req: Request) {}
