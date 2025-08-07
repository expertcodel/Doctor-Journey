"use server"
import { NextResponse } from "next/server";
import { countryCode } from "../../models/country.model";
import { journal_registrationModel } from "../../models/journal_subscription.model";
export async function GET(request) {
    const input = new URL(request.url).searchParams;
    const id = input.get('id');
    const countryModel = await countryCode();
    const journals_registrationmodel = await journal_registrationModel();

    if(id==='null')
    {
         return NextResponse.json({status: false, message: "can't proceed" });
    }

    if (!countryModel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
    try {

        const countryList = await countryModel.findAll({

            attributes: ["id", "name", "nicename", "iso", "iso3", "numcode", "phonecode"]
        });

        const response = await journals_registrationmodel.findOne({where:{id,is_paid:false},attributes:['id','volume', 'amount', 'plans', 'journal_id', 'journal_name'] })
        return NextResponse.json({ status: true, country: countryList,journaldata:response});


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message:"some error occured" });
    }






}