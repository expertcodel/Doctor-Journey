import { videoModel } from "../../../models/video.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";

import { Op } from "sequelize";

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    console.log(name,'n');
    
    const videomodel = await videoModel();

    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await videomodel.findAndCountAll({

            where: { videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } } },
            limit: 10,
            order:  [['views', 'DESC'], ['createdAt', 'DESC']],
            attributes: ['videoId', 'videoTitle', 'videoUrl']
        })

       return NextResponse.json({ status: true, videolist: rows, totalItems: count});

    }

   catch (error) {

    const message = extractErrorMessage(error);
    return NextResponse.json({ status: false, message });
}
}