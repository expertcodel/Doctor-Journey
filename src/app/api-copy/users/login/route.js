"use server"
import { NextResponse } from "next/server";
import { UserModel } from "../../../models/user.model";
import { cookies } from "next/headers";
import { roleModel } from "@/app/models/role.model";
// import {activityModel} from '@/app/models/activity.model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
// import Cookies from 'universal-cookie';



export async function POST(request) {

   const { email, password } = await request.json();
   //  const api_key = new Headers(request.headers).get('api_key') + email;
   const usermodel = await UserModel();
   //const cookie = await cookies();
   // const activitymodel=await activityModel();
   const role = await roleModel();

   const isValiduser = await usermodel.findOne({ where: { email } });
   if (!isValiduser) {
      return NextResponse.json({ status: 0, message: "User not found!" });
   }

   // const isApikeyValid = await bcrypt.compare(api_key, isValiduser.api_key);
   // if (!isApikeyValid) {
   //    return NextResponse.json({ status: 0, message: "Unauthorized access!" });
   // }

   // if (isValiduser.name !== name) {
   //    return NextResponse.json({ status: 0, message: "Wrong Credentials!" });
   // }

   const isPasswordvalid = await bcrypt.compare(password, isValiduser.password);
   if (!isPasswordvalid) {
      return NextResponse.json({ status: 0, message: "Wrong Password!" });
   }

   try {

      const menubar = await role.findOne({ where: { usertype: isValiduser.usertype } });
       //console.log(menubar.access);

      const token = jwt.sign({ userData: isValiduser}, process.env.AUTHENTICATION_KEY, { expiresIn: '1h' })

      
      //  console.log(token,"jd");

      //NextResponse.cookies.set('token',token,{httpOnly:true,maxAge:3600})

      // await activitymodel.create({

      //    userId:isValiduser.userId,
      //    name:isValiduser.name,
      //    usertype:isValiduser.usertype,
      //    activity:'sign in',
      //    time:new Date().toLocaleString()

      // })

      await cookies().set('token', token, { httpOnly: true, maxAge: 3600,path:'/'});

   //  const response= NextResponse.json({ status: 1, message: "Verified user!", url: `/${isValiduser.usertype}` });
   //  response.cookies.set('token', token, { httpOnly: true, maxAge: 3600,path:'/'});
   //  return response
  return NextResponse.json({ status: 1, message: "Verified user!", url: `/${isValiduser.usertype}` });

   } catch (error) {

      console.log(error);
      return NextResponse.json({ status: 0, message: "some error occured!" });

   }


}

export async function GET() {
   const token = await cookies();
   const role = await roleModel();
   if (!token.get('token')) {
      return NextResponse.json({ status: false, message: 'token not found!', url: '/login' });
   }

   const isValiduser = jwt.verify(token.get('token').value, process.env.AUTHENTICATION_KEY);
   if (!isValiduser) {
      return NextResponse.json({ status: false, message: 'token not verified!', url: '/' });
   }

   const { usertype } = isValiduser;
   const menubar = await role.findOne({ where: { usertype } });
   return NextResponse.json({ status: true, message: 'user verified!', userdata: { isValiduser, menubar: menubar.access } });
}