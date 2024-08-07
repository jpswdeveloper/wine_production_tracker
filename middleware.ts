import { NextResponse, NextRequest } from "next/server";
import { verifyData } from "./app/utils/session";

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware is running");
    const token = request.cookies.get("userToken");
    if (!token) {
      throw Error("Unauthorized");
    }
    const verifyUser = await verifyData(token?.value as string);
    console.log("Verify User:", verifyUser);
    if (verifyUser.status === 401) {
      throw Error("Unauthorized");
    }
    // return NextResponse.next();
  } catch (error) {
    console.log("Error is happening", JSON.stringify(error));
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/product"]
};
