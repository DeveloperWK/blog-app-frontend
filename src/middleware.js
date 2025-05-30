import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.pathname;
  const role = req.cookies.get("role")?.value;
  const token = req.cookies.get("token")?.value;
  const isEditPost = url.startsWith("/users/post/edit-post");
  const isWritePost = url.startsWith("/users/post/write-post");
  if (url.startsWith("/dashboard") && role !== "admin")
    return NextResponse.redirect(new URL("/admin", req.nextUrl));

  if (isEditPost || (isWritePost && role !== "writer"))
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));

  if (url.startsWith("/auth") && token)
    return NextResponse.redirect(new URL("/", req.nextUrl));
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/post/edit-post",
    "/users/post/write-post",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/reset-password",
    "/auth/confirm-2fa",
    "/auth/confirm-otp",
    "/auth/send-reset-password-link",
  ],
};
