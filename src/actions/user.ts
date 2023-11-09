"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../../utils/auth/getCookie";

import handleClientError from "../../utils/errors/handleClientError";

// Request to edit a profile
export const editProfile = async (e: FormData) => {
  try {
    // Getting the token from the cookie
    const token = getTokenFromCookie();

    // Getting name and email and photo of the user
    const name = e.get("name");
    const email = e.get("email");
    // For later purposes
    // const img = e.get("img");

    // Checking if all the details are provided
    if (!name || !email) throw new Error("Please provide all the details");

    // Sending the request
    const res = await fetch(`${serverApi}/api/users`, {
      method: "PATCH",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to do the request");

    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    return data;
  } catch (err) {
    return handleClientError(err);
  }
};

// To logout
export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.delete("token");
  return true;
};

// To delete an account
export async function deleteAccount(e: FormData) {
  try {
    // Getting the token from the cookies
    const cookieStore = cookies();
    const token = getTokenFromCookie();

    // Getting Password and confirmation
    const password = e.get("password");
    const confirmation = e.get("disclaimer");

    // Checking if all the details are provided or not
    if (!password) throw new Error("Please provide your password");
    if (!confirmation) throw new Error("Please check the terms and conditions");

    // Sending the request
    const res = await fetch(`${serverApi}/api/users`, {
      cache: "no-cache",
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Revalidating the tags
    revalidateTag("liked-blogs");
    revalidateTag("blogs");
    revalidateTag("blog");
    revalidateTag("single-user-blogs");

    // Deleting the cookie
    cookieStore.delete("token");

    // Returning the data
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
