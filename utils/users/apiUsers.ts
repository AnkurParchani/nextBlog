import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../auth/getCookie";

// Getting a particular user (through userID)
export const getUser = async (userId: string) => {
  const res = await fetch(`${serverApi}/api/users/${userId}`);

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.user;
};

// Getting the current logged in user
export const getLoggedInUser = async () => {
  const token = getTokenFromCookie();
  const res = await fetch(`${serverApi}/api/users`, {
    headers: { Cookie: `token=${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();

  return data.user;
};
