import { NextResponse } from 'next/server';
import {roleModel} from '../../../models/role.model'


export async function DELETE(request)
{
    const {usertype,status}=await request.json();
    const role=await roleModel();
    if(!role)
    {
        return NextResponse.json({status:0,message:"some error occured"});
    }

    await role.update({status:!status},{where:{usertype}});
    return NextResponse.json({status:1,message:"deleted successfully"});

}