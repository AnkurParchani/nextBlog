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

    if (!title || !content) throw new Error("Please provide all the details");

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

    revalidateTag("blogs");
    // Returning back to the preious page
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
