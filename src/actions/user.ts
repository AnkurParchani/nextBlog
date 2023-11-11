"use server";

import supabase, { supabaseUrl } from "../../lib/supabase";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { serverApi } from "../../lib/globals";
import { getTokenFromCookie } from "../../utils/auth/getCookie";

import handleClientError from "../../utils/errors/handleClientError";

// Getting the current logged in user
export const getLoggedInUser = async () => {
  const token = getTokenFromCookie();
  const res = await fetch(`${serverApi}/api/users`, {
    headers: { Cookie: `token=${token}` },
    next: { tags: ["user"] },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();

  return data.user;
};

// Request to edit a profile
export const editProfile = async (e: FormData, userImg?: string) => {
  try {
    // Getting the token from the cookie
    const token = getTokenFromCookie();

    // Getting name and email and photo of the user
    const name = e.get("name");
    const email = e.get("email");

    // Checking if all the details are provided
    if (!name || !email) throw new Error("Please provide all the details");

    let newUserDetails;
    if (userImg) newUserDetails = { name, email, img: userImg };
    else newUserDetails = { name, email };

    // Sending the request
    const res = await fetch(`${serverApi}/api/users`, {
      method: "PATCH",
      body: JSON.stringify(newUserDetails),
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

// Uploading an image
export const uploadUserImg = async (e: FormData) => {
  // Getting the img
  const img = e.get("img");

  if (!(img instanceof File)) throw new Error("Image not provided");

  // Setting name and path for the img
  const imgName = `${Math.random()}-${img.name}`.replaceAll("/", "");
  const imgPath = `${supabaseUrl}/storage/v1/object/public/users/${imgName}`;

  // Uploading the img to the bucket
  const { error } = await supabase.storage.from("users").upload(imgName, img);

  // If any error found while uploading the img
  if (error) {
    console.log(error);
    throw new Error("Something went wrong while uploading the img");
  }

  return imgPath;
};

// To logout
export const logout = () => {
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

    // Deleting the cookie
    cookieStore.delete("token");

    // Revalidating the tags
    revalidateTag("liked-blogs");
    revalidateTag("blogs");
    revalidateTag("blog");
    revalidateTag("single-user-blogs");

    // Returning the data
    return data;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
