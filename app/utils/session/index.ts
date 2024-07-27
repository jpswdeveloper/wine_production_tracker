import { serialize } from "cookie";
import { sign, verify, JwtPayload, VerifyErrors } from "jsonwebtoken";

export const session = (encryptedSessionData: object | string) =>
  serialize("userToken", encryptData(encryptedSessionData), {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 2, // Two Day
    path: "/"
  });

export const encryptData = (data: object | string): string => {
  return sign(data, process.env.JWTSECRETKEY as string);
};

export const verifyData = async (
  token: string | undefined
): Promise<string | object> => {
  if (token == undefined) {
    throw Error("No Token");
  }

  const decode = verify(
    token,
    process.env.JWTSECRETKEY as string,
    (err: VerifyErrors | null, payload) => {
      if (err) {
        throw Error("Unauthorize");
      }
      return payload;
    }
  ) as unknown as JwtPayload;
  return decode;
};
