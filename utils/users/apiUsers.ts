import { serverApi } from "../../lib/globals";

export const getUser = async (userId: string) => {
  console.log("User id ", userId);
  console.log("Going for the request");
  const res = await fetch(`${serverApi}/api/users/${userId}`);
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.user;
};
