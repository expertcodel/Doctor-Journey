"use server"
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request) {

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  const userdata = request.cookies.get('userData');
  const statusKey = request.cookies.get('statusKey')
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);


  if (pathname.startsWith('/buy-now')) {

    const id = new URL(request.url).searchParams.get('id');
    response.headers.set('x-id', id);
  }
  
  if (pathname.startsWith('/success')) {

    const token = new URL(request.url).searchParams.get('token');
    if (!statusKey) {
      return NextResponse.redirect(new URL('/journals', request.url));
    }

    await cookies().delete('statusKey')
    if (token !== statusKey.value) {
      return NextResponse.redirect(new URL('/journals', request.url));
    }



  }

  if (pathname.startsWith('/failed')) {

    const token = new URL(request.url).searchParams.get('token');

    if (!statusKey) {
      return NextResponse.redirect(new URL('/journals', request.url));
    }

    await cookies().delete('statusKey')
    if (token !== statusKey.value) {
      return NextResponse.redirect(new URL('/journals', request.url));
    }
  }

  if (pathname.startsWith('/doctors')) {
    const category = new URL(request.url).searchParams.get('category');
    response.headers.set('x-category', category);
  }

  if (pathname.startsWith('/blog')) {
    const category = new URL(request.url).searchParams.get('category');
    response.headers.set('x-category', category);
  }

  if (pathname.startsWith('/doctor-profile')) {
    const category = new URL(request.url).searchParams.get('category');
    response.headers.set('x-category', category);
  }

  if (!token) {

    if (userdata) {
      await cookies().delete('userData');
    }

    if (pathname.startsWith('/user-dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;

  }



  try {



    const verifiedtoken = await jwtVerify(token.value, new TextEncoder().encode(process.env.AUTHENTICATION_KEY));
    if (!verifiedtoken) {
      if (pathname === '/login') {
        return response
      }
      else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/user-dashboard', request.url));
    }



    response.cookies.set('userData', JSON.stringify(verifiedtoken.payload))
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
    console.log(error, "errorjfnf");
    if (pathname !== '/login') {


      NextResponse.redirect(new URL('/login', request.url));
    }

    return response
  }


}

export const config = {
  matcher: [

    // '/user-dashboard/:path*', '/login', '/:path*', '/dashboard/:path*'
    '/((?!_next/|favicon.ico|api/|assets/|images/|fonts/).*)'
  ],
};

// '/((?!_next/|favicon.ico|api/|assets/|images/|fonts/).*)',

