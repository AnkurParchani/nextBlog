import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import User from "../../../../models/userModel";
import catchAsync from "../../../../utils/errors/catchAsync";
import AppError from "../../../../utils/errors/appError";
import Blog from "../../../../models/blogModel";
import Comment from "../../../../models/commentModel";
import Like from "../../../../models/likeModel";

import { getUser } from "../../../../utils/auth/getUser";

// Getting the current logged in user only
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();

  const user = await getUser();
  if (!user || !user._id)
    return NextResponse.json(new AppError(401, "Please Login first"));

  return NextResponse.json({ status: "success", user });
});

// Deleting a particular user
export const DELETE = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Checking authentication
  const user = await getUser();
  if (!user || !user._id)
    return NextResponse.json(new AppError(401, "Please Login first"));

  // Deleting the blogs of the user
  await Blog.deleteMany({ user: user._id });
  // Deleting the comments of the user
  await Comment.deleteMany({ user: user._id });
  // Deleting the Likes of the user
  await Like.deleteMany({ user: user._id });
  // Deleting the user
  await User.findByIdAndDelete(user._id);

  // Seding success response
  return NextResponse.json({ status: "success", message: "user deleted" });
});
