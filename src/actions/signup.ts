"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import handleClientError from "../../utils/errors/handleClientError";

export async function signup(e: FormData, imgPath?: string) {
  try {
    let userDetails;
    console.log("inside the signup funciton of client side");
    console.log("got name email password");

    // Getting email and password
    const name = e.get("name");
    const email = e.get("email");
    const password = e.get("password");
    const passwordConfirm = e.get("passwordConfirm");
    console.log(name, email, password, passwordConfirm);

    if (!email || !password || !name || !passwordConfirm) return;

    if (imgPath)
      userDetails = { email, password, name, passwordConfirm, img: imgPath };
    else userDetails = { email, password, name, passwordConfirm };

    // Sending the request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    console.log("logging res", res);
    const data = await res.json();
    console.log("logging data", data);

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Setting the cookie
    cookies().set("token", data.token);

    // Revalidating tags
    revalidateTag("users");

    // Returning back to the preious page
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
