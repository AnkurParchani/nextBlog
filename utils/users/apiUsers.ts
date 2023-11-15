import { getTokenFromCookie } from "../auth/getCookie";
import handleClientError from "../errors/handleClientError";

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/all-users`,
      {
        cache: "no-cache",
        next: { tags: ["users"] },
      }
    );
    if (!res.ok) throw new Error("failed to fetch");

    const data = await res.json();
    return data.users;
  } catch (err) {
    return handleClientError(err);
  }
};

// Getting a particular user
export const getUser = async () => {
  try {
    const token = getTokenFromCookie();
    if (!token) return { tokenError: true };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: "no-cache",
      headers: { Cookie: `token=${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();

    return data.user;
  } catch (err) {
    return handleClientError(err);
  }
};
