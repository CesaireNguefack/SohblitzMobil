import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

 

export function proxy(request: NextRequest){

  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")

  // Ignore static files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split("/")
  const locale = segments[1]
  const pathnameWithoutLocale = "/" + segments.slice(2).join("/")

 
  // Handle login page
  if(pathnameWithoutLocale === "/administration"){

    if(token){
      return NextResponse.redirect(
        new URL(`/${locale}/administration/reservations`,request.url)
      )
    }

    return NextResponse.next()
  }

  // Protect admin routes
  if(pathnameWithoutLocale.startsWith("/administration")){

    if(!token){
      return NextResponse.redirect(
        new URL(`/${locale}/administration`,request.url)
      )
    }
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/((?!_next|api|images).*)"
  ]
}