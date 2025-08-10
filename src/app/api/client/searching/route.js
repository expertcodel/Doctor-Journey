import { videoModel } from "../../../models/video.model";
import { journalsModel } from "../../../models/journals.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";

import { Op } from "sequelize";

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const path = input.get('path');

    const videomodel = await videoModel();
    const journalsmodel = await journalsModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        if (path === '/') {
            const { rows, count } = await videomodel.findAndCountAll({

                where: { videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } } },
                limit: 10,
                order: [['views', 'DESC'], ['createdAt', 'DESC']],
                attributes: ['videoId', 'videoTitle', 'videoUrl']
            })

            return NextResponse.json({ status: true, videolist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await journalsmodel.findAndCountAll({

                where: { status: true, journalStatus: 'published', [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` } } },
                limit: 10,
                order: [['createdAt', 'DESC']],
                attributes: ['journalsId', 'journalsName', 'journalsUrl']
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });

        }

    }

    catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}