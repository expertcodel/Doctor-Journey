import {articleModel} from '../../../models/article.model'
import { NextResponse } from "next/server";
import { Op } from 'sequelize';

export async function POST(request)
{
    const {articlesList,journalsId}=await request.json();
    const articlemodel=await articleModel();
    // console.log(articlesList,journalsId);
     
    if(!articlemodel)
    {
        return NextResponse.json({status:false,message:'database error occured'});
    }

    try {

        await articlemodel.update({journalsId,articleStatus:'published'},{where:{articleId:{[Op.in]:articlesList}}})
        return NextResponse.json({status:true,message:'added sucessfully'});
        
    } catch (error) {
        
        console.log(error);
        
    }

   
      

    
}