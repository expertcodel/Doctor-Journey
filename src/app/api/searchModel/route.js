import {articleModel} from '../../models/article.model'
import {NextResponse} from 'next/server'
import { Op } from 'sequelize';
export async function GET(request)
{
   
    const articlemodel=await articleModel();
    const query=new URL(request.nextUrl).searchParams.get('query');
    
    
    try {

         const response=await articlemodel.findAll({where:{[Op.or]:{articleTitle:{[Op.like]:`%${query}%`},articleId:{[Op.like]:`%${query}%`}},articleStatus:'approved'}});

         return NextResponse.json({status:true,response});

    } catch (error) {
        
        return NextResponse.json({status:false,message : "some error occured",error});
    }

   // return NextResponse.json({status:false,message : "some error occured"});
}