
import { videoModel } from "../../../models/video.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { doctorModel } from "../../../models/doctor.model";
import { Op } from "sequelize";
export async function POST(request) {

    const { videoId } = await request.json();
    const videomodel = await videoModel();
    const doctormodel = await doctorModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        const videodetail = await videomodel.findOne({
            where: { videoId }
           
        })

        const doctordetail = await doctormodel.findOne({
            where: { doctorId:videodetail.doctorId },
            attributes: ['profileImage', 'doctorName', 'shortDescription','doctorId','qualification']
           
        })


        const videolist = await videomodel.findAll({
            limit: 15,
            where: {videoStatus: true,doctorId:videodetail.doctorId},
            order: [['createdAt', 'DESC']],
            attributes: ['publishedDate', 'thumbnailImage', 'videoId', 'videoTitle']
        })

        return NextResponse.json({ status: true, videodetail, videolist,doctordetail });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await videomodel.findAndCountAll({

            limit: 9,
            offset: (page - 1) * 9,
            where: { [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, videolist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}