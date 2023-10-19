import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/catchAsync";
import AppError from "../../../../../utils/appError";
import User from "../../../../../models/userModel";

// Creating the user (login)
export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();
  const { name, email, password, passwordConfirm } = await req.json();

  // If both passwords don't match
  if (password !== passwordConfirm)
    return NextResponse.json(
      new AppError(400, "Password and Password Confirm don't match")
    );

  // Creating the user
  const user = await User.create({ name, email, password, passwordConfirm });

  // Creating the jsonwebtoken
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

  // Assigning the token as a cookie
  setCookie("token", token);

  return NextResponse.json({ status: "success", user });
});
