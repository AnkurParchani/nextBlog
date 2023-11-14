import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../lib/dbConnect";
import catchAsync from "../../../../../utils/errors/catchAsync";
import AppError from "../../../../../utils/errors/appError";
import User from "../../../../../models/userModel";
import checkCredentials from "../../../../../utils/auth/checkCredentials";
import { cookies } from "next/headers";
import { sign } from "../../../../../utils/auth/jwt_verify_sign";

// Getting  the user (login)
export const POST = catchAsync(async (req: Request) => {
  connectMongoDB();
  console.log("inside the login function of server side");
  console.log("got email and password");
  const { email, password } = await req.json();
  console.log(email, password);

  // If both passwords don't match
  if (!email || !password)
    return NextResponse.json(
      new AppError(400, "Please provide all the details")
    );

  // Getting the user according to provided email and checking the password
  const user = await User.findOne({ email }).select("+password");
  const correct = user && (await checkCredentials(password, user.password));

  // If no user found or password is not correct
  if (!correct)
    return NextResponse.json(new AppError(400, "Invalid username or password"));

  // Creating the token using jose
  const token = await sign(
    { userId: user._id },
    process.env.JWT_SECRET as string
  );

  // Setting the cookie (for postman)
  cookies().set("token", token);

  // If user is found and password is also correct then returning success
  return NextResponse.json({ status: "success", token, user });
});
