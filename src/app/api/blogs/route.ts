import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import Blog from "../../../../models/blogModel";
import AppError from "../../../../utils/appError";

import { getUser } from "../../../../utils/getUser";

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
  const { title, content } = await req.json();

  connectMongoDB();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const blog = await Blog.create({ title, content });
  return NextResponse.json({ status: "success", blog });
}
