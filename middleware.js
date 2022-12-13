import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const cookie = request.cookies.get("user");

  if (request.nextUrl.pathname.startsWith("/jogos")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (!cookie) {
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/perfil")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (!cookie) {
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/newEvent")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (!cookie) {
      return NextResponse.redirect(url);
    }
  }
  if (request.nextUrl.pathname.startsWith("/success")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (!cookie) {
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/jogos";
    if (cookie) {
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith("/register")) {
    const url = request.nextUrl.clone();
    url.pathname = "/jogos";
    if (cookie) {
      return NextResponse.redirect(url);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
