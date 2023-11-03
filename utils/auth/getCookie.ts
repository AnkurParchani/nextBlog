import { cookies } from "next/headers";

export const getTokenFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("No token found");

  return token;
};
