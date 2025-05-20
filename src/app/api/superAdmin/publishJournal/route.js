import  {publishJournalmodel}  from "../../../models/publish_journal_model";
import { articleModel } from "../../../../app/models/article.model";
import { NextResponse } from "next/server";
import { journalsModel } from "../../../../app/models/journals.model";
import { Op } from "sequelize";

 
export async function POST(request)
{

   
    const recievedData=await request.json();
    const{volume,issue,publishDate,journalsId,imageUrl,editorialDetails,journalTitle,price,check}=recievedData;
    
    const publishJournal=await publishJournalmodel();
    const journalmodel=await journalsModel();
    const articlemodel=await articleModel();
    
    if(!publishJournal || !articlemodel)
    {
       return NextResponse.json({status:false,message:"database error occured!"});
    }

    try {


        await publishJournal.create({
            
            volume,issue,publishDate,journalsId,imageUrl,
            coverSummary:editorialDetails[0],editorialDetails:editorialDetails[1],subscription:editorialDetails[2],
            journalTitle,price
        })

        await journalmodel.update({journalStatus:'published'},{where:{journalsId}});

        await articlemodel.update({journalsId,volume,articleStatus:'published'},{where:{articleId:{[Op.in]:check}}});
        return NextResponse.json({status:true,message:"journal published sucessfully"});
        
    } catch (error) {
        
       console.log(error);
       return NextResponse.json({status:false,message:"some error occured try again!"});
    }

    //return NextResponse.json({status:false,message:"database error occured!"});
   
    
}


export async function GET(request)
{
    const sequelize=await publishJournalmodel();
    
    if(!sequelize)
    {
        return NextResponse.json({status:false,message:"database error occured!"});
    }
    
    try {

        const publishedJournallist=await sequelize.findAll();
        return NextResponse.json({status:true,publishedJournallist});

    } catch (error) {

        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
        
    }
    
}