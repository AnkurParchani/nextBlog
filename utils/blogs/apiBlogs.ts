import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../auth/getCookie";

type SingleBlog = {
  status: string;
  blog: Blog;
  comments: Comment[];
};

type LikedBlogsType = {
  status: string;
  blogs: Blog[];
  user: User;
};

// Get all blogs (of every user)
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${serverApi}/api/blogs`, {
    next: { tags: ["blogs"] },
  });
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.blogs;
};

// Get all blogs (of a particular user - global ones)
export const getBlogsOfSingleUser = async (userId: string): Promise<Blog[]> => {
  const res = await fetch(`${serverApi}/api/users/blogs?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.blogs;
};

// Get a single blog
export const getBlog = async (blogId: string): Promise<SingleBlog> => {
  const res = await fetch(`${serverApi}/api/blogs/${blogId}`);
  if (!res.ok) throw new Error("Failed to fetch");

  const blog = await res.json();

  return blog;
};

export const getLikedBlogs = async (): Promise<LikedBlogsType> => {
  const token = getTokenFromCookie();
  const res = await fetch(`${serverApi}/api/likes/my-liked-blogs`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data;
};
