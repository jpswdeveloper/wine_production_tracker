import { encryptData, session } from "@/app/utils/session";
import type { NextApiRequest, NextApiResponse } from "next";

export async function handler(request: NextApiRequest, res: NextApiResponse) {
  const { userId } = request.body;
  const encryptedSessionData = encryptData(userId);
  const cookie = session(encryptedSessionData);
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Successfully set cookie!" });
}
