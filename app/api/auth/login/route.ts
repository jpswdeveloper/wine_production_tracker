import { verifyData } from "@/app/utils/session";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    const token = cookies().get("userToken");
    const user = await verifyData(String(token?.value));
    return Response.json(
      { userData: user.payload },
      {
        status: 200
      }
    );
  } catch (error) {
    throw error;
  }
}
