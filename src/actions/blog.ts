"use server";

import { revalidateTag } from "next/cache";
import { getTokenFromCookie } from "../../utils/auth/getCookie";

import handleClientError from "../../utils/errors/handleClientError";
import supabase, { supabaseUrl } from "../../lib/supabase";

// Adding a blog
export async function addBlog(e: FormData, blogImg?: string) {
  try {
    // Getting the token from the cookies
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    // Getting email and content
    const title = e.get("title");
    const content = e.get("content");
    const isGlobal = e.get("global");

    // If there is not content or title OR either one of them has exceeded the specified limit
    if (!title || !content) throw new Error("Please provide all the details");
    if ((title as string).length > 20 || (content as string).length > 500)
      throw new Error("Unexpected Content length");

    // Setting up the data
    let blogDetails;
    if (blogImg)
      blogDetails = {
        title,
        content,
        isGlobal: isGlobal === "on",
        img: blogImg,
      };
    else blogDetails = { title, content, isGlobal: isGlobal === "on" };

    // Sending the request
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
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

// Adding image to the blog
export const uploadBlogImg = async (e: FormData) => {
  try {
    const img = e.get("img");

    // Setting name and path for the img
    // @ts-ignore
    const imgName = `${Math.random()}-${img.name}`.replaceAll("/", "");
    const imgPath = `${supabaseUrl}/storage/v1/object/public/blogs/${imgName}`;

    // Uploading the img to the bucket
    // @ts-ignore
    const { error } = await supabase.storage.from("blogs").upload(imgName, img);

    // If any error found while uploading the img
    if (error) {
      console.log(error);
      throw new Error("Something went wrong while uploading the img");
    }

    return imgPath;
  } catch (err) {
    return handleClientError(err);
  }
};

// To like blog
export async function likeBlog(blogId: string) {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes/like`,
      {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({ blogId }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );

    if (!res.ok)
      throw new Error("Something went wrong, please try again later");

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
  } catch (err) {
    return handleClientError(err);
  }
}

// To dislike a blog
export const dislikeBlog = async (blogId: string) => {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes/dislike`,
      {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({ blogId }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );

    if (!res.ok)
      throw new Error("Something went wrong, please try again later");

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
  } catch (err) {
    return handleClientError(err);
  }
};

// Updating a particular blog
export const updateBlog = async (
  e: FormData,
  blogId: string,
  blogImg: string | undefined
) => {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    const title = e.get("title");
    const content = e.get("content");
    const isGlobal = e.get("global") === "on";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
      {
        cache: "no-cache",
        method: "PATCH",
        body: JSON.stringify({ title, content, isGlobal, img: blogImg }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );

    if (!res.ok)
      throw new Error("Something went wrong, please try again later");

    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    revalidateTag("blogs");
    revalidateTag("liked-blogs");
    revalidateTag("blog");
    revalidateTag("user");
    revalidateTag("single-user-blogs");

    return data;
  } catch (err) {
    return handleClientError(err);
  }
};

// Adding a comment on the blog
export const addComment = async (event: FormData) => {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    const content = event.get("content");
    const blogId = event.get("blogId");

    if (!blogId || !content) throw new Error("Please provide all the details");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      cache: "no-cache",
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
  } catch (err) {
    return handleClientError(err);
  }
};

// Deleting a blog
export const deleteBlog = async (blogId: string) => {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
      {
        cache: "no-cache",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );

    if (!res.ok)
      throw new Error("Something went wrong, please try again later");

    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    revalidateTag("blogs");

    return data;
  } catch (err) {
    return handleClientError(err);
  }
};
