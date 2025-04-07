// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: any = await verifyToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // You could add user info to headers if needed
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", payload.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply only to protected routes
export const config = {
  matcher: ["/api/users/me"], // add more routes as needed
};
