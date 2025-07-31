import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { connectTodb } from "../../../../database/database";

export async function GET() {

    const connection = await connectTodb();
    if (!connection) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       const categorylist = await connection.query(`SELECT * FROM public."Categories"`)
       return NextResponse.json({ status: true, categorylist:categorylist[0] });
    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}