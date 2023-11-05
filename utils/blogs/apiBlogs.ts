import { serverApi } from "../../lib/globals";

type SingleBlog = {
  success: string;
  blog: Blog;
  comments: Comment[];
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
  console.log("Inside the getblogofsingleuser and running");
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
