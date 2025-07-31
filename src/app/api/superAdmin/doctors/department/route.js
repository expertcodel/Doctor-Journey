import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { connectTodb } from "../../../../database/database";

export async function GET() {

    const connection = await connectTodb();

    if (!connection) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const departmentlist = await connection.query(`SELECT * FROM public."Departments"`)
        return NextResponse.json({ status: true, departmentlist:departmentlist[0] });


    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}