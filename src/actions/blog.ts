"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../../utils/auth/getCookie";

import handleClientError from "../../utils/errors/handleClientError";
import { headers } from "next/headers";

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

// To like blog
export async function likeBlog(blogId: string) {
  const token = getTokenFromCookie();

  const res = await fetch(`${serverApi}/api/likes/like`, {
    method: "POST",
    body: JSON.stringify({ blogId }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong, please try again later");

  const data = await res.json();

  // If any error found (operational)
  if (data.isOperational || data.status === "fail")
    throw new Error(data.message);

  // Revalidating necessary tags
  revalidateTag("blogs");
  revalidateTag("blog");
  revalidateTag("liked-blogs");
  revalidateTag("single-user-blogs");

  return data;
}

// To dislike a blog
export const dislikeBlog = async (blogId: string) => {
  const token = getTokenFromCookie();

  const res = await fetch(`${serverApi}/api/likes/dislike`, {
    method: "POST",
    body: JSON.stringify({ blogId }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong, please try again later");

  const data = await res.json();

  // If any error found (operational)
  if (data.isOperational || data.status === "fail")
    throw new Error(data.message);

  // Revalidating necessary tags
  revalidateTag("blogs");
  revalidateTag("liked-blogs");
  revalidateTag("blog");
  revalidateTag("single-user-blogs");

  return data;
};

// Updating a particular blog
export const updateBlog = async (e: FormData, blogId: string) => {
  const token = getTokenFromCookie();

  const title = e.get("title");
  const content = e.get("content");
  const isGlobal = e.get("global") === "on";

  const res = await fetch(`${serverApi}/api/blogs/${blogId}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content, isGlobal }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong, please try again later");

  const data = await res.json();

  // If any error found (operational)
  if (data.isOperational || data.status === "fail")
    throw new Error(data.message);

  revalidateTag("blogs");

  return data;
};

export const deleteBlog = async (blogId: string) => {
  const token = getTokenFromCookie();

  const res = await fetch(`${serverApi}/api/blogs/${blogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong, please try again later");

  const data = await res.json();

  // If any error found (operational)
  if (data.isOperational || data.status === "fail")
    throw new Error(data.message);

  revalidateTag("blogs");

  return data;
};

// Adding a comment on the blog
export const addComment = async (event: FormData) => {
  const token = getTokenFromCookie();

  const content = event.get("content");
  const blogId = event.get("blogId");

  if (!blogId || !content) throw new Error("Please provide all the details");

  const res = await fetch(`${serverApi}/api/comments`, {
    method: "POST",
    body: JSON.stringify({ content, blogId }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) throw new Error("failed to do the request");

  const data = await res.json();

  // If any error found (operational)
  if (data.isOperational || data.status === "fail")
    throw new Error(data.message);

  // Revalidating necessary tags
  revalidateTag("blogs");
  revalidateTag("liked-blogs");
  revalidateTag("blog");
  revalidateTag("single-user-blogs");

  return data;
};
