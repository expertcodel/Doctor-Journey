import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { videoModel } from "../../../../models/video.model.js";


export async function POST(request) {

    const {videoId} = await request.json();
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       

        const videodetail=await videomodel.findOne({
           where:{videoId}
        })

        return NextResponse.json({status: true,videodetail});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}