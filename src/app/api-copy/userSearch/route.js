import { NextResponse } from "next/server";
import {UserModel} from '../../models/user.model.js'
import { Op } from "sequelize";

export async function POST(request)
{
    const {input}=await request.json();
    const usermodel=await UserModel();
    if(!usermodel)
    {
        return NextResponse.json({status:false,message:"database error occured!"});
    }

    try {

        const response=await usermodel.findAll({where:{[Op.or]:{name:{[Op.like]:`%${input}%`},userId:{[Op.like]:`%${input}%`}}}});
        return NextResponse.json({status:true,response});
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
        
    }

}