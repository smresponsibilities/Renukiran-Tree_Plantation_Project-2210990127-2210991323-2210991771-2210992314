import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const NGO_JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_for_student_project_123";
const ngo_secretKey = new TextEncoder().encode(NGO_JWT_SECRET);

export async function middleware(req: NextRequest) {
  const ngo_authToken = req.cookies.get("auth_token")?.value;
  const ngo_currentPath = req.nextUrl.pathname;

  // Protect /admin routes
  if (ngo_currentPath.startsWith("/admin")) {
    if (!ngo_authToken) return NextResponse.redirect(new URL("/login", req.url));
    try {
      const { payload } = await jwtVerify(ngo_authToken, ngo_secretKey);
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /dashboard and checkout routes
  if (ngo_currentPath.startsWith("/dashboard") || ngo_currentPath.startsWith("/api/razorpay")) {
    if (!ngo_authToken) return NextResponse.redirect(new URL("/login", req.url));
    try {
      await jwtVerify(ngo_authToken, ngo_secretKey);
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/razorpay/:path*"],
};
