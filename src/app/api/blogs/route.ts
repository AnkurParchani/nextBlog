import mongoose from "mongoose";
import { NextResponse } from "next/server";

import connectMongoDB from "../../../../lib/dbConnect";

const Blog = mongoose.model("Blog");

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "From the blog GET function",
  });
}

export async function POST(req: Request): Promise<NextResponse> {
  const { title, content } = await req.json();
  console.log(title, content);
  console.log("Connecting to database");

  connectMongoDB();

  console.log("Database connection successfull");
  await Blog.create({ title, content });
  return NextResponse.json({ status: "success", message: "created" });
}
