import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/dbConnect";
import User from "../../../../../models/userModel";

// Getting all the users
export const GET = async (req: Request) => {
  connectMongoDB();
  const users = await User.find();

  return NextResponse.json({
    status: "success",
    users,
  });
};
