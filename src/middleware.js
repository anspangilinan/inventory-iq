// import { getSession } from "next-auth/next";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
// export async function middleware(req) {
//   console.log(req);
//   const session = await getSession();
//   // You could also check for any property on the session object,
//   // like role === "admin" or name === "John Doe", etc.
//   console.log(1234, { session });
//   if (!session) return NextResponse.redirect("/login");

//   // If user is authenticated, continue.
//   return NextResponse.next();
// }
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
