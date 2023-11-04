import { NextResponse } from "next/server";

import connectMongoDB from "../../../../../../lib/dbConnect";
import Blog from "../../../../../../models/blogModel";
import handleApiError from "../../../../../../utils/errors/handleApiError";

// type for params
type BlogParams = {
  params: {
    userId: string;
  };
};

// Getting all blogs of a particular user (which are global)
export async function GET(req: Request, { params: { userId } }: BlogParams) {
  try {
    connectMongoDB();

    const blogs = await Blog.find().where({ user: userId });
    const blogsToShow = blogs.filter((blog) => blog.isGlobal);

    return NextResponse.json({ status: "success", blogsToShow });
  } catch (err) {
    handleApiError(err);
  }
}
