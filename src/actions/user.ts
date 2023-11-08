"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../../utils/auth/getCookie";
import handleClientError from "../../utils/errors/handleClientError";

// To delete an account
export async function deleteAccount(e: FormData) {
  try {
    // Getting the token from the cookies
    const token = getTokenFromCookie();

    // Getting Password and confirmation
    const password = e.get("password");
    const confirmation = e.get("disclaimer");

    // Checking if all the details are provided or not
    if (!password) throw new Error("Please provide your password");
    if (!confirmation) throw new Error("Please check the terms and conditions");

    // Sending the request
    const res = await fetch(`${serverApi}/api/users`, {
      cache: "no-cache",
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Revalidating the tags
    revalidateTag("liked-blogs");
    revalidateTag("blogs");
    revalidateTag("blog");
    revalidateTag("single-user-blogs");
    // Returning the data
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
