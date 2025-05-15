"use server"
import {otpModel} from '../../models/otp.model'
import { NextResponse } from 'next/server';
export async function POST(request)
{
    const {email,otp}=await request.json();
    const otpmodel=await otpModel();
    if(!otpmodel)
    {
        return NextResponse.json({status:0,message:"some error occured!"});
    }

    const checkOtp=await otpmodel.findOne({where:{email:email}});
     
    if(checkOtp.otp!==otp)
    {
        return NextResponse.json({status:0,message:"Otp didn't matched!"});
    }
    
    return NextResponse.json({status:1,message:"Otp verified!"});
}