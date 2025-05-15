import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { authorModel } from "../../../../models/author.model.js";


export async function POST(request) {

    const {authorId} = await request.json();
    const authormodel = await authorModel();
    if (!authormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       

        const authordetail=await authormodel.findOne({
           where:{authorId}
        })

        return NextResponse.json({status: true,authordetail});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}