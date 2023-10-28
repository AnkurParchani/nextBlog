import { serverApi } from "../../lib/globals";

export const getBlogs = async () => {
  const res = await fetch(`${serverApi}/api/blogs`);
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.blogs;
};