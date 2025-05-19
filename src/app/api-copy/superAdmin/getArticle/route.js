"use server"
import { NextResponse } from 'next/server';
import {articleModel} from '../../../models/article.model'

export async function POST(request)
{
    const {articleId}=await request.json();

    const articlemodel=await articleModel();
    if(!articlemodel)
    {
        return NextResponse.json({status:false,message:"some error occured"});
    }

    const article=await articlemodel.findOne({where:{articleId}});
    if(!article)
    {
        return NextResponse.json({status:false,message:"article not found"});
    }
    return NextResponse.json({status:true,article:article});

}

export async function GET() {

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const articles = await article.findAll({where:{articleStatus:'published'},order:[['id','ASC']]});
    return NextResponse.json({ status: true,articles});

}