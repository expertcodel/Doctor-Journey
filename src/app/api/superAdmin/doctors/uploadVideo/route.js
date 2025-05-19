import { NextResponse } from "next/server";
import { fileUploader } from "../../../../../utils/fileUploader";
import { videoModel } from "../../../../models/video.model";
import { extractErrorMessage } from "../../../../../utils/errorMessage"
import { Op } from "sequelize";
export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { doctorId, doctorName, views, specialization, videoUrl, videoTitle, videoContent } = JSON.parse(input.get('data'));
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        let thumbnailImage;
        if (file !== 'null' && file !== 'undefined') {
            thumbnailImage = await fileUploader(file)

        }

        await videomodel.create({ doctorId, doctorName, views, specialization, videoUrl, videoTitle, videoContent, thumbnailImage: thumbnailImage && thumbnailImage });
        return NextResponse.json({ status: true, message: "Video Uploaded Successfully!" });


    } catch (error) {

        console.log(error,'err');
        
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}


export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { videoUrl, videoId, videoTitle, videoContent, videoStatus } = JSON.parse(input.get('data'));
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        let thumbnailImage;
        if (file !== 'null' && file !== 'undefined') {
            thumbnailImage = await fileUploader(file)

        }

        await videomodel.update({ videoUrl, videoTitle, videoContent, thumbnailImage: thumbnailImage && thumbnailImage,videoStatus}, { where: { videoId } });
        return NextResponse.json({ status: true, message: "Video Uploaded Successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}


export async function DELETE(request) {

    const { videoId } = await request.json();
    const videomodel = await videomodel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await videomodel.destroy({
            where: { videoId }
        })

        return NextResponse.json({ status: true, message: "Video deleted successfully!" });


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

            limit: 10,
            offset: (page - 1) * 10,
            where: { [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, videolist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}