import { NextResponse } from 'next/server'
import { connectTodb } from "@/app/database/database";


export async function GET(request)
{
    const journalsId=new URL(request.nextUrl).searchParams.get('journalsId');
    const sequelize=await connectTodb();

    try {

        const response=await sequelize.query(`SELECT * FROM "Publishjournals" INNER JOIN "Articles" ON "Publishjournals"."journalsId"="Articles"."journalsId" WHERE "Publishjournals"."journalsId"='${journalsId}'`);
        
        return NextResponse.json({status:true,response});
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured"});
    }
    

}