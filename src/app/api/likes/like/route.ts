import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/catchAsync";
import AppError from "../../../../../utils/appError";
import Like from "../../../../../models/likeModel";
import Blog from "../../../../../models/blogModel";

import { getUser } from "../../../../../utils/getUser";

// Function to like a blog
export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Authentication
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  // Getting the blogId and user
  const { blogId } = await req.json();

  // Checking if the user has already liked the blog
  const existingLike = await Like.findOne({ blog: blogId, user: user._id });
  if (existingLike)
    return NextResponse.json(
      new AppError(400, "You've already liked this blog")
    );

  // Creating the like blog
  const like = await Like.create({ blog: blogId, user: user._id });

  // Updating the number of likes on the liked blog (+1)
  await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

  // The response
  return NextResponse.json({ status: "success", like });
});
