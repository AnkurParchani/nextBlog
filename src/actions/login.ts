"use server";

import { cookies } from "next/headers";
import { serverApi } from "../../lib/globals";
import handleClientError from "../../utils/errors/handleClientError";

export async function login(e: FormData) {
  try {
    // Getting email and password
    const email = e.get("email");
    const password = e.get("password");

    if (!email || !password) return;

    const userDetails = { email, password };

    // Sending the request
    const res = await fetch(`${serverApi}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await res.json();

    // If any error found (operational)
    if (data.isOperational || data.status === "fail")
      throw new Error(data.message);

    // Setting the cookie
    cookies().set("token", data.token);

    // Returning success
    return true;
  } catch (err: unknown) {
    return handleClientError(err);
  }
}
