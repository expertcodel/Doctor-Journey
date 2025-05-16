import { NextResponse } from "next/server";
import {activityModel} from '../../models/activity.model.js'

export async function GET(request)
{
    const activitymodel=await activityModel();
    if(!activitymodel)
    {
        return NextResponse.json({status:false,message:"database error occured!"});
    }

    try {
        const activityList=await activitymodel.findAll({order:[['id','DESC']]});
        return NextResponse.json({status:true,activityList});

    } catch (error) {
        console.log(error);
        return NextResponse.json({status:false,message:"some error occured!"});
    }
}