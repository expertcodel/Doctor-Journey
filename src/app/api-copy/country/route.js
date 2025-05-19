"use server"
import { NextResponse } from "next/server";
import { countryCode } from "../../models/country.model";

export async function GET()
{
    const countryModel=await countryCode();
    if(!countryModel)
    {
        return NextResponse.json({status:false,message:"some error occured!"});
    }

    const countryList=await countryModel.findAll({
       
        attributes:["id", "name", "nicename", "iso", "iso3", "numcode", "phonecode"]
    });
    
    return NextResponse.json({status:true,list:countryList});
}