import bcrypt from "bcrypt";

export default async function checkCredentials(
  userPassword: string,
  dbPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, dbPassword);
}
