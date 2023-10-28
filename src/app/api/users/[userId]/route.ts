import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/dbConnect";
import User from "../../../../../models/userModel";
import handleApiError from "../../../../../utils/errors/handleApiError";

// type for params
type BlogParams = {
  params: {
    userId: string;
  };
};

// Getting a particular blog
export async function GET(req: Request, { params: { userId } }: BlogParams) {
  try {
    connectMongoDB();

    const user = await User.findById(userId);

    return NextResponse.json({ status: "success", user });
  } catch (err) {
    handleApiError(err);
  }
}
