import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/errors/catchAsync";
import AppError from "../../../../../utils/errors/appError";
import Blog from "../../../../../models/blogModel";

import { getUser } from "../../../../../utils/auth/getUser";

// Getting all the blogs of a particular user
export const GET = catchAsync(async () => {
  connectMongoDB();

  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const blogs = await Blog.find().where({ user: user._id });

  return NextResponse.json({ status: "success", blogs });
});
