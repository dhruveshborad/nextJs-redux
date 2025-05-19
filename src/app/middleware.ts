import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/librarian") && role !== "librarian") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/reader") && role !== "reader") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/librarian/:path*", "/reader/:path*"],
};
