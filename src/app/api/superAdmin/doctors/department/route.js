import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { connectTodb } from "../../../../database/database";
import {countryCode} from '../../../../models/country.model'
export async function GET() {

    const connection = await connectTodb();
    const country = await countryCode();

    if (!connection) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const departmentlist = await connection.query(`SELECT * FROM public."Departments"`)
        const countrylist=await country.findAll({order:[['id','ASC']]})
        return NextResponse.json({ status: true, departmentlist:departmentlist[0],countrylist});


    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}