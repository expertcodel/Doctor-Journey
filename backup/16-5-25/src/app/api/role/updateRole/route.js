import { NextResponse } from 'next/server';
import {roleModel} from '../../../models/role.model'

export async function POST(request)
{
    const{access,usertype}=await request.json();
    const role=await roleModel();
    if(!role)
    {
        return NextResponse.json({status:false,message:"some error occured"});
    }

    await role.update({access},{where:{usertype}})
    return  NextResponse.json({status:true,message:"role updated successfully"});
}