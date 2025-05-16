"use server"
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request) {

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');
  const userdata = request.cookies.get('userData');
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  //return response;

  // if (pathname === '/') {
  //   return response
  // }

  // console.log(pathname, 'lkl');


  // if (pathname.startsWith(['/about-us', '/contact-us', 'doctor-profile', '/doctors', '/forgot-password', '/register', '/user-dashboard', '/verify-otp'])) {
  //   return response;
  // }

  if (!token) {

    // if (pathname === '/') {
    //   return response;
    // }

    // if (pathname === '/login') {


    //   return response;
    // }
    // if (pathname === '/admin') {

    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    return response;

  }

  try {


   
    const verifiedtoken = await jwtVerify(token.value, new TextEncoder().encode(process.env.AUTHENTICATION_KEY));
    if (!verifiedtoken) {
     return  NextResponse.redirect(new URL('/login', request.url));
    }

    // if (pathname.startsWith(['/login'])) {
    //   return NextResponse.redirect(new URL(`/${verifiedtoken.payload.userData.usertype}`, request.url));
    // }

    // const rolemodel=await roleModel();
    // const menuItem = await rolemodel.findOne({ where: { usertype: isValiduser.usertype } });
    // const menubar=menuItem.access


    if (!userdata) {
      response.cookies.set('userData', JSON.stringify(verifiedtoken.payload),{maxAge:3600});
    }

    // console.log(verifiedtoken.payload,'hj');

    // await cookies().set('userData', JSON.stringify(verifiedtoken.payload))


    if (pathname.startsWith([`/${verifiedtoken.payload.userData.usertype}`])) {
      return response;
    }



    // if (!pathname.startsWith([`/${verifiedtoken.payload.userData.usertype}`])) {
    // return  NextResponse.redirect(new URL(`/${verifiedtoken.payload.userData.usertype}/notFound`, request.url));
    // }

    //  const menubar = verifiedtoken.payload.menubar;
    // for (let i = 0; i < menubar.length; i++) {
    //   if (menubar[i].path === 'scroll') {

    //     const status = menubar[i].allowed;
    //     for (let j = 0; j < menubar[i].child.length; j++) {



    //       if (menubar[i].child[j].path === 'scroll') {

    //         for (let k = 0; k < menubar[i].child[j].child.length; k++) {

    //           if (pathname.startsWith([menubar[i].child[j].child[k].path])) {

    //             if (!status) {
    //              return NextResponse.redirect(new URL(`/${verifiedtoken.payload.userData.usertype}/notFound`, request.url));
    //             }
    //           }
    //         }
    //       }
    //       else {

    //         if (pathname.startsWith([menubar[i].child[j].path])) {

    //           if (!status) {
    //             return NextResponse.redirect(new URL(`/${verifiedtoken.payload.userData.usertype}/notFound`, request.url));
    //           }
    //         }

    //       }


    //     }
    //   }
    //   else {

    //     if (pathname.startsWith([menubar[i].path])) {

    //       if (menubar[i].allowed) {
    //        return NextResponse.redirect(new URL(`/${verifiedtoken.payload.userData.usertype}/notFound`, request.url));
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

// export const config = {
//   matcher: [
  
//     '/admin/:path*','/login'
//   ],
// };

  // '/((?!_next/|favicon.ico|api/|assets/|images/|fonts/).*)',

