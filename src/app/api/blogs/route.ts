import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";
import Blog from "../../../../models/blogModel";

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
  await Blog.create({ title, content });
  return NextResponse.json({ status: "success", message: "created" });
}
