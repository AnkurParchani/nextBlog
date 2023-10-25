import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/catchAsync";
import AppError from "../../../../../utils/appError";
import User from "../../../../../models/userModel";
import { sign } from "../../../../../utils/jwt_verify_sign";

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

  // Creating the token using jose
  const token = await sign(
    { userId: user._id },
    process.env.JWT_SECRET as string
  );

  // Setting the cookie
  cookies().set("token", token);

  return NextResponse.json({ status: "success", user });
});
