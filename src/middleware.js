"use server"
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request) {

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  // const userdata = request.cookies.get('userData');
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);


  if (!token) {

    if (pathname.startsWith('/user-dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;

  }

  try {



    const verifiedtoken = await jwtVerify(token.value, new TextEncoder().encode(process.env.AUTHENTICATION_KEY));
    if (!verifiedtoken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/user-dashboard', request.url));
    }

    response.cookies.set('userData', JSON.stringify(verifiedtoken.payload), { maxAge: 3600 })
    //  console.log('path',pathname);
    // for (let i = 0; i < verifiedtoken.payload.length; i++) {
    //  let allowed=verifiedtoken.payload[i].allowed;
    //   for (let j = 0; j < verifiedtoken.payload[i].child.length; i++) {
        
    //     if (verifiedtoken.payload[i].child[j].path === pathname) {
    //       if (!allowed) {
    //         console.log(allowed,'hello','hhh',pathname);
            
    //         return NextResponse.redirect(new URL('/dashboard/notFound', request.url));
    //       }
    //     }
    //   }
    // }

    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', request.url));
  }


}

export const config = {
  matcher: [

    // '/user-dashboard/:path*', '/login', '/:path*', '/dashboard/:path*'
    '/((?!_next/|favicon.ico|api/|assets/|images/|fonts/).*)'
  ],
};

// '/((?!_next/|favicon.ico|api/|assets/|images/|fonts/).*)',

