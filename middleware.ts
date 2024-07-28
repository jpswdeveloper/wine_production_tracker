import { MiddlewareMatcher } from "next/dist/build/analysis/get-page-static-info";
import { NextResponse, NextRequest } from "next/server";
import { verifyData } from "./app/utils/session";

export const config = {
  matcher: ["/auth:path*"]
};

export async function middleware(request: NextRequest) {
  try {
    console.log("Middle ware is running");
    const token = request.cookies.get("userToken");
    if (!token) {
      throw Error("Unauthorized");
    }
    const verifyUser = await verifyData(token?.value as string);
    console.log("ver", verifyUser);
    if (verifyUser.status == 401) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
      // throw Error("Unauthorized");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      return NextResponse.next();
    }
  } catch (e) {
    console.log("e", e);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
