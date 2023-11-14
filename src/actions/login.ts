"use server";

import { cookies } from "next/headers";
import handleClientError from "../../utils/errors/handleClientError";
import { revalidateTag } from "next/cache";

export async function login(e: FormData) {
  try {
    // Getting email and password
    const email = e.get("email");
    const password = e.get("password");

    if (!email || !password) return;

    const userDetails = { email, password };

    // Sending the request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Setting the cookie
    cookies().set("token", data.token);

    // Revalidating tags
    revalidateTag("users");
    revalidateTag("blogs");
    revalidateTag("user");

    // Returning back to the preious page
    return data;
  } catch (err: unknown) {
    console.log("inside the catch block of login and logging the error", err);
    return handleClientError(err);
  }
}
