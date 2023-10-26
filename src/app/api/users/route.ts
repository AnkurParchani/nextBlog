import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import User from "../../../../models/userModel";
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";
import { getUser } from "../../../../utils/getUser";

// Getting a particular user
export const GET = catchAsync(async () => {
  connectMongoDB();

  // Checking authentication
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

  // Deleting the user
  await User.findByIdAndDelete(user._id);

  // Seding success response
  return NextResponse.json({ status: "success" });
});
