"use server"
import { NextResponse } from "next/server";
import { otpModel } from "../../models/otp.model";
import { UserModel } from "../../models/user.model";
import nodemailer from 'nodemailer'



async function sendEmail(email,otp)
{
    
    const config={

        service:'gmail',
        auth:{

            user:"rohitkumarchau656@gmail.com",
            pass:"pihc knoi rbca lrif"
        }
    }

    try {

        const createMail=nodemailer.createTransport(config);
        await createMail.sendMail({
            
            from:'JournalsMind',
            to:email.trim(),
            subject:'JournalsMind otp verification',
            html:`<h4>Your otp</h4> <div>${otp}</div>`
    
        })
    
        return true;
        
    } catch (error) {
        
        console.log(error);
        return false;
    }

   
}

const generateOtp=()=>
{
    const otp= Math.floor(1000 + Math.random() * 9000);
    return otp;
}


export async function POST(request)
{
  
    const {email}=await request.json();
    const api_key=new Headers(request.headers).get('api_key');
    if(api_key!==process.env.NEXT_PUBLIC_SECRET_KEY)
    {
        return  NextResponse.json({status:0,message:"Unauthorized user!"});
    }
    const usermodel=await UserModel();
    const isExisteduser=await usermodel.findOne({where:{email}});
    if(isExisteduser)
    {
        return  NextResponse.json({status:0,message:"User already existed!"});
    }

    const otp=generateOtp();
    const sent=sendEmail(email,otp);
    if(!sent)
    {
        return NextResponse.json({status:0,message:"some error occured!"});
    }

    const otpmodel= await otpModel();
    if(!otpmodel)
    {
        return NextResponse.json({status:0,message:"some error occured!"});
    }

    const isExist=await otpmodel.findOne({where:{email:email}});
    if(!isExist)
    {
        await otpmodel.create({
            email:email,
            otp:otp
        })
    }
    else{

        await isExist.update({otp:otp});
    }

   return NextResponse.json({status:1,message:"otp sent successfully!"});
   
    
}