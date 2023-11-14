"use server";
import { getTokenFromCookie } from "../auth/getCookie";
import handleClientError from "../errors/handleClientError";

type SingleBlog = {
  status: string;
  blog: Blog;
  comments: Comment[];
};

// Get all blogs (of every user)
export const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      next: { tags: ["blogs"] },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    return data.blogs;
  } catch (err) {
    console.log("Catching the error of get all blogs");
    console.log("logging it", err);
  }
};

// Get all blogs (of a particular user - global ones)
export const getBlogsOfSingleUser = async (userId: string): Promise<Blog[]> => {
  console.log("Inside the getblogsofsingleuser");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/blogs?userId=${userId}`,
    {
      next: { tags: ["single-user-blogs"] },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();
  console.log(data);

  return data.blogs;
};

// Get a single blog
export const getBlog = async (blogId: string): Promise<SingleBlog> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
    {
      next: { tags: ["blog"] },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch");

  const blog = await res.json();

  return blog;
};

// Get my liked blogs
export const getLikedBlogs = async () => {
  try {
    const token = getTokenFromCookie();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes/my-liked-blogs`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        next: { tags: ["liked-blogs"] },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data;
  } catch (error) {
    return handleClientError(error);
  }
};

// Get my blogs (of current logged in one)
export const getMyBlogs = async (): Promise<Blog[]> => {
  const token: string = getTokenFromCookie();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/my-blogs`,
    {
      headers: { Cookie: `token=${token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.blogs;
};
