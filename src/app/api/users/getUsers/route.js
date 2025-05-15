import { NextResponse } from 'next/server';
import {UserModel} from '../../../models/user.model'


export async function POST(request)
{
    
    const usermodel=await UserModel();
    if(!usermodel)
    {
        return NextResponse.json({status:false,message:"some error occured"});
    }

 
    const api_key=new Headers(request.headers).get('api_key');
    if(api_key!==process.env.NEXT_PUBLIC_SECRET_KEY)
    {
        return NextResponse.json({status:false,message:"Unauthorized access"});
    }

    const getAllusers=await usermodel.findAll();
     return  NextResponse.json({status:true,getAllusers});
    
    
}