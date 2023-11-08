import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";

import User from "../../models/userModel";

import { verify } from "./jwt_verify_sign";

export async function getUser() {
  try {
    // Getting the token from cookie
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // Getting the userId according to the cookie
    const decode: JwtPayload = await verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    const {
      payload: { userId },
    } = decode;

    // Getting the user according to userId
    const user = await User.findOne({ _id: userId }).select("+password");

    // Sending back the user
    return user;
  } catch (err) {
    // If cookie was not found OR cookie is invalid OR cookie is expired
    return undefined;
  }
}
