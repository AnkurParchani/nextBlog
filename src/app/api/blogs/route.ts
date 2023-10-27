import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import Blog from "../../../../models/blogModel";
import AppError from "../../../../utils/errors/appError";

import { getUser } from "../../../../utils/auth/getUser";

// Getting all the blogs
export async function GET() {
  connectMongoDB();
  const blogs = await Blog.find();

  return NextResponse.json({
    status: "success",
    blogs,
  });
}

// Creating a blog
export async function POST(req: Request) {
  connectMongoDB();
  const { title, content, isGlobal } = await req.json();

  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const blog = await Blog.create({ title, content, user: user._id, isGlobal });
  return NextResponse.json({ status: "success", blog });
}
