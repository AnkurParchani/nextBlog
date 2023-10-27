import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export async function sign(payload: object, secret: string): Promise<string> {
  // Making the iat time and exp time for the payload
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // valid for 24 hours

  // SignJWT function from jose
  return new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  // Verify function from jose
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  // return the whole payload (contains the payload that we sent, the exp time, the iat time)
  return payload;
}
