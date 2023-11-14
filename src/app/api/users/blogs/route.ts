import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/dbConnect";
import Blog from "../../../../../models/blogModel";
import handleApiError from "../../../../../utils/errors/handleApiError";

// Getting all blogs of a particular user (which are global)
export async function GET(request: NextRequest) {
  try {
    connectMongoDB();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    const tempBlogs = await Blog.find()
      .where({ user: userId })
      .populate("user");

    const blogs = tempBlogs.filter((blog) => blog.isGlobal);

    return NextResponse.json({ status: "success", blogs });
  } catch (err) {
    return handleApiError(err);
  }
}
