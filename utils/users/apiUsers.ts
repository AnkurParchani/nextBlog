import handleClientError from "../errors/handleClientError";

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/all-users`,
      {
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

// Getting a particular user (through userID)
export const getUser = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.user;
};
