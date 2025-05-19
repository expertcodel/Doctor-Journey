import { NextResponse } from "next/server";
import { roleModel } from "../../../models/role.model";

export async function GET()
{
    const roles=await roleModel();
    if(!roles)
    {
        return NextResponse.json({status:false,message:"message occured"});
    }
    const allRoles=await roles.findAll({order:[['id','ASC']]});
    return NextResponse.json({status:true,allRoles})
}

export async function POST(request)
{
    const {usertype}=await request.json();
    const role= await roleModel();

    const menubar=await role.findOne({where:{usertype}});
    return NextResponse.json({status:true,menubar:menubar.access});

}