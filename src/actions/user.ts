"use server";

import { getTokenFromCookie } from "../../utils/auth/getCookie";
import handleClientError from "../../utils/errors/handleClientError";

// To delete an account
export async function deleteAccount(e: FormData) {
  try {
    // Getting the token from the cookies
    const token = getTokenFromCookie();

    // Getting Password and confirmation
    const password = e.get("password");
    const confirmation = e.get("confirmation");

    // Checking if all the details are provided or not
    if (!password) throw new Error("Please provide your password");
    if (!password) throw new Error("Please check the terms and conditions");

    // Sending the request
    //   const res = await fetch(`${serverApi}/api/blogs`, {
    //     cache: "no-cache",
    //     method: "POST",
    //     body: JSON.stringify(blogDetails),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Cookie: `token=${token}`,
    //     },
    //   });
    //   const data = await res.json();

    // If any error found (operational)
    //   if (data.isOperational || data.status === "fail")
    //     throw new Error(data.message);

    // Returning the data
    //   return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
