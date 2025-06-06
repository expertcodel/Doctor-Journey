import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { publisherModel } from "../../../../models/publisher.model.js";


export async function POST(request) {

    const {publisherId} = await request.json();
    const publishermodel = await publisherModel();
    if (!publishermodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       

        const publisherdetail=await publishermodel.findOne({
           where:{publisherId}
        })

        return NextResponse.json({status: true,publisherdetail});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}