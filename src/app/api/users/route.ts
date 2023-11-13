import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import User from "../../../../models/userModel";
import catchAsync from "../../../../utils/errors/catchAsync";
import AppError from "../../../../utils/errors/appError";
import Blog from "../../../../models/blogModel";
import Comment from "../../../../models/commentModel";
import Like from "../../../../models/likeModel";

import { getUser } from "../../../../utils/auth/getUser";
import checkCredentials from "../../../../utils/auth/checkCredentials";

// Getting the current logged in user only
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();

  const user = await getUser();
  if (!user || !user._id)
    return NextResponse.json(new AppError(401, "Please Login first"));

  return NextResponse.json({ status: "success", user });
});

// Updating a particular user
export const PATCH = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { name, email, img } = await req.json();

  const user = await getUser();
  if (!user || !user._id)
    return NextResponse.json(new AppError(401, "Please login first"));

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name, email, img },
    { new: true, runValidators: true }
  );

  return NextResponse.json({ status: "success", updatedUser });
});

// Deleting a particular user
export const DELETE = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { password } = await req.json();
  if (!password)
    return NextResponse.json(new AppError(401, "Password is required"));

  // Checking authentication
  const user = await getUser();
  if (!user || !user._id)
    return NextResponse.json(new AppError(401, "Please Login first"));

  // Checking the credentials
  const check = await checkCredentials(password, user.password);
  if (!check) return NextResponse.json(new AppError(401, "Invalid password"));

  // Removing all the likes and comments before deleting the user
  const likes = await Like.find().where({ user: user._id });
  if (likes.length > 0)
    likes.map(
      async (like) =>
        await Blog.findByIdAndUpdate(like.blog, { $inc: { likes: -1 } })
    );

  const comments = await Like.find().where({ user: user._id });
  if (comments.length > 0)
    comments.map(
      async (comment) =>
        await Blog.findByIdAndUpdate(comment.blog, { $inc: { comments: -1 } })
    );

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
