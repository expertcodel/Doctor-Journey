import {articleModel} from '../../models/article.model'
import { NextResponse } from 'next/server'
import { Op } from 'sequelize';

export async function POST(request)
{
    const {checkedArticle}=await request.json();
    const articlemodel=await articleModel();
    if(!articlemodel)
    {
        return NextResponse.json({status:false,message:"database error occured!"});
    }

    try {

        await articlemodel.update({articleStatus:'approved'},{where:{articleId:{[Op.in]:checkedArticle}}});
        return NextResponse.json({status:true,message:"Approved successfully!"});
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
    }
}