import { UserModel } from "../../../models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { activityModel } from "@/app/models/activity.model";
export async function POST(request) {

    
    const {userId,name,email,mobile_number,profile_img,usertype}=await request.json();
    const usermodel=await UserModel();
    const activitymodel=await activityModel();
    const cookie=await cookies();
    if(!usermodel)
    {
        return NextResponse.json({ status:false, message: "database error occured!" });
    }

   
    
    try {

        if(profile_img!=="")
        {
            await usermodel.update({
                userId,name,email,mobile_number,usertype,profile_img
            },{where:{userId}})
        }
        else{

            await usermodel.update({
                userId,name,email,mobile_number,usertype
            },{where:{userId}})

        }
      

        const isValiduser=await usermodel.findOne({where:{userId}})
        
        const token=jwt.sign({userId:isValiduser.userId,name:isValiduser.name,email:isValiduser.email,usertype:isValiduser.usertype,mobile_number:isValiduser.mobile_number,joining_date:isValiduser.joining_date,profile_img:isValiduser.profile_img},process.env.AUTHENTICATION_KEY,{expiresIn:'1h'})
        cookie.set('token',token,{httpOnly:true,maxAge:3600})

        await activitymodel.create({

            userId:isValiduser.userId,
            name:isValiduser.name,
            usertype:isValiduser.usertype,
            activity:'update profile',
            time:new Date().toLocaleString()
      
         })

        return NextResponse.json({status:true, message:"changed successfully!" });
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false, message:"some error occured!" });
        
    }
}