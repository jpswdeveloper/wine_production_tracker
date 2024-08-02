import { cookies } from "next/headers";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

export const session = async (encryptedSessionData: object) => {
  const token = await encryptData(encryptedSessionData);
  return cookies().set("userToken", token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 2, // Two Day
    path: "/"
  });
};

// Logout
export const destroySession = () => {
  cookies().set("userToken", "", {
    expires: new Date(0)
  });
};
export const encryptData = async (payload: object): Promise<string> => {
  const iat = Math.floor(Date.now() / 1000); // Issued at time
  const exp = iat + 60 * 60; // Expiration time (1 hour)

  const jwt: string = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(process.env.JWTSECRETKEY as string));

  return jwt;
};

export const verifyData = async (
  token: string
): Promise<{ status: number; payload?: JWTPayload; error?: any }> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWTSECRETKEY as string)
    );
    return { status: 200, payload };
  } catch (error) {
    return { status: 401, error };
  }
};
