import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { organizationModel } from "../../../../models/organization.model.js";


export async function POST(request) {

    const {organizationId} = await request.json();
    const organizationmodel = await organizationModel();
    if (!organizationmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       

        const organizationdetail=await organizationmodel.findOne({
           where:{organizationId}
        })

        return NextResponse.json({status: true,organizationdetail});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}