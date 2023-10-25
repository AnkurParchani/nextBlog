import { NextResponse } from "next/server";

import Comment from "../../../../models/commentModel";
import AppError from "../../../../utils/appError";
import connectMongoDB from "../../../../lib/dbConnect";
import { getUser } from "../../../../utils/getUser";

// Getting all the comments of a particular blog
export async function GET(req: Request) {
  connectMongoDB();
  const { blogId } = await req.json();
  if (!blogId)
    return NextResponse.json(new AppError(404, "Provide the blog id"));

  const comments = await Comment.find().where({ blog: blogId });
  return NextResponse.json({ status: "success", comments });
}

// Creating a new comment
export async function POST(req: Request) {
  connectMongoDB();
  const user = await getUser();
  if (!user) return NextResponse.json(new AppError(401, "Please login first"));

  const { content, blogId } = await req.json();
  if (!content || !blogId)
    return NextResponse.json(
      new AppError(404, "Please provide all the details")
    );

  const comment = await Comment.create({ content, blogId, isEdited: false });
  return NextResponse.json({ status: "success", comment });
}
