import { getTokenFromCookie } from "../auth/getCookie";
import handleClientError from "../errors/handleClientError";

// Get all blogs (of every user)
export const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      next: { tags: ["blogs"] },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    return data.blogs;
  } catch (err) {
    return handleClientError(err);
  }
};

// Get all blogs (of a particular user - global ones)
export const getBlogsOfSingleUser = async (userId: string) => {
  try {
    console.log("Inside the getblogsofsingleuser");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/blogs?userId=${userId}`,
      {
        cache: "no-store",
        next: { tags: ["single-user-blogs"] },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    console.log(data);

    return data.blogs;
  } catch (err) {
    return handleClientError(err);
  }
};

// Get my blogs (of current logged in one)
export const getMyBlogs = async () => {
  try {
    const token: string = getTokenFromCookie();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/my-blogs`,
      {
        cache: "no-cache",
        headers: { Cookie: `token=${token}` },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    return data.blogs;
  } catch (err) {
    return handleClientError(err);
  }
};

// Get a single blog
export const getBlog = async (blogId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`,
      {
        cache: "no-cache",
        next: { tags: ["blog"] },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const blog = await res.json();

    return blog;
  } catch (err) {
    return handleClientError(err);
  }
};

// Get my liked blogs
export const getLikedBlogs = async () => {
  try {
    const token = getTokenFromCookie();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/likes/my-liked-blogs`,
      {
        cache: "no-cache",
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
