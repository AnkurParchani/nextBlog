import { NextResponse } from "next/server";

import Comment from "../../../../models/commentModel";
import AppError from "../../../../utils/errors/appError";
import connectMongoDB from "../../../../lib/dbConnect";
import catchAsync from "../../../../utils/errors/catchAsync";
import Blog from "../../../../models/blogModel";

import { getUser } from "../../../../utils/auth/getUser";

// Getting all the comments of a particular blog
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Getting the blog id through searchParams
  const blogId = (req as any).nextUrl.searchParams.get("blogId");
  if (!blogId)
    return NextResponse.json(new AppError(404, "Provide the blog id"));

  const comments = await Comment.find().where({ blog: blogId });

  return NextResponse.json({ status: "success", comments });
});

// Creating a new comment
export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();

  // Checking Authentication
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  // Getting the content and blogId
  const { content, blogId } = await req.json();
  if (!content || !blogId)
    return NextResponse.json(
      new AppError(404, "Please provide all the details")
    );

  // Checking if the user has already commented on the blog or not
  const checkAlreadyCommented = await Comment.findOne({
    blog: blogId,
    user: user._id,
  });

  // If Already commented
  if (checkAlreadyCommented)
    return NextResponse.json(
      new AppError(400, "You've already commented on this blog")
    );

  // Not commented yet... Making the comment
  const comment = await Comment.create({
    content,
    blog: blogId,
    isEdited: false,
    user: user._id,
  });

  // Updating the number of comments on the blog (+1)
  await Blog.findByIdAndUpdate(blogId, { $inc: { comments: 1 } });

  // The response
  return NextResponse.json({ status: "success", comment });
});

// Deleting a comment
export const DELETE = catchAsync(async (req: Request) => {
  connectMongoDB();

  const { commentId } = await req.json();

  // Authentication
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  // Deleting the comment
  const comment = await Comment.findByIdAndDelete(commentId).where({
    user: user._id,
  });
  if (!comment) return NextResponse.json(new AppError(404, "No comment found"));

  // Updating the number of comments on the blog (+1)
  await Blog.findByIdAndUpdate(comment.blog, { $inc: { comments: -1 } });

  return NextResponse.json({ status: "success" });
});
