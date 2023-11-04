import { serverApi } from "../../lib/globals";

export const getUser = async (userId: string) => {
  const res = await fetch(`${serverApi}/api/users/${userId}`);

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.user;
};
