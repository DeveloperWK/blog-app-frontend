import {NextResponse} from "next/server";

export function middleware(req){
    const url= req.nextUrl.pathname
    const role = req.cookies.get('role')?.value
    /*
if(url.startsWith('/dashboard') && role !== 'admin') return NextResponse.redirect(new URL('/admin', req.nextUrl))
if(url.startsWith('/users/post') && role !== 'writer') return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl))

*/


}
export const config = {
    matcher:[
        "/dashboard/:path*",
        "/users/post/:path*"
    ]
}