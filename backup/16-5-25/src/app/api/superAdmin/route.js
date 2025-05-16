import { NextResponse } from "next/server";
import { superAdminmodel } from "../../models/superadmin.model";
export async function POST(request)
{
    const {menubar}=await request.json();
    const superadminmodel=superAdminmodel();
    if(!superadminmodel)
    {
        return NextResponse.json({status:false,message:"some error occured"});
    }

    await superadminmodel.create({

        menubar:menubar

    })

    return NextResponse.json({status:true,message:"data inserted successfully"});

}

export async function GET(request)
{
    const superadminmodel=await superAdminmodel();
    if(!superadminmodel)
    {
        return NextResponse.json({status:false,message:"some error occured"});
    }
    
    const menubar=await superadminmodel.findOne({

       where:{id:1}
    });
    
    
  
   
    return NextResponse.json({status:true,menubar:menubar.menubar});

}