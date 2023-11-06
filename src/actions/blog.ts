"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "../../lib/globals";
import handleClientError from "../../utils/errors/handleClientError";
import { getTokenFromCookie } from "../../utils/auth/getCookie";

export async function addBlog(e: FormData) {
  try {
    // Getting the token from the cookies
    const token = getTokenFromCookie();

    // Getting email and content
    const title = e.get("title");
    const content = e.get("content");
    const isGlobal = e.get("global");

    // If there is not content or title OR either one of them has exceeded the specified limit
    if (!title || !content) throw new Error("Please provide all the details");
    if ((title as string).length > 20 || (content as string).length > 500)
      throw new Error("Unexpected Content length");

    const blogDetails = { title, content, isGlobal: isGlobal === "on" };

    // Sending the request
    const res = await fetch(`${serverApi}/api/blogs`, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(blogDetails),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Revalidating desired tags
    revalidateTag("blogs");

    // Returning the data
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
