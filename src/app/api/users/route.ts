import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import User from "../../../../models/userModel";
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";
import mongoose from "mongoose";

// Getting a particular user
export const GET = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { id } = await req.json();

  const user = await User.findById(id);
  return NextResponse.json({ status: "success", user });
});

// Deleting a particular user
export const DELETE = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { id } = await req.json();

  // Finding and checking if user exists with the given ID
  const user = await User.findOne({ _id: id });

  if (!user) {
    return NextResponse.json(
      new AppError(404, "No user found with provided ID")
    );
  }

  // Deleting the user
  await User.findByIdAndDelete(id);

  // Seding success response
  return NextResponse.json({ status: "success" });
});
