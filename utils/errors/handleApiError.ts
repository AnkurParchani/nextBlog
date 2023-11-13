import { NextResponse } from "next/server";
import AppError from "./appError";

// The global api Error
export default function handleApiError(err: unknown) {
  if (err !== null && err !== undefined) {
    // Handling duplicate email error
    if (typeof err === "object" && "code" in err && err.code === 11000) {
      return NextResponse.json(new AppError(400, "Email already exists"));
    }

    if ((err as Error).message) {
      return NextResponse.json(new AppError(400, (err as Error).message));
    }
  }

  console.log(err);

  // If don't know what the error is about
  return NextResponse.json({
    status: "fail",
    message: "Something went wrong, please try again later",
    statusCode: 500,
  });
}
