
import { videoModel } from "../../../models/video.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { doctorModel } from "../../../models/doctor.model";
import { connectTodb } from "../../../../app/database/database";
import { Op } from "sequelize";
export async function POST(request) {

    const { videoId } = await request.json();
    const videomodel = await videoModel();
    const doctormodel = await doctorModel();
    const connection = await connectTodb();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        const videodetail = await videomodel.findOne({
            where: { videoId }

        })

        const doctordetail = await doctormodel.findOne({
            where: { userId: videodetail.userId },
            attributes: ['profileImage', 'doctorName', 'shortDescription', 'doctorId', 'qualification']

        })


        const videolist = await videomodel.findAll({
            limit: 15,
            where: { videoStatus: true, userId: videodetail.userId },
            order: [['createdAt', 'DESC']],
            attributes: ['publishedDate', 'thumbnailImage', 'videoId', 'videoTitle', 'videoUrl']
        })

        const specialization = await connection.query(`SELECT public."Doctors"."specialization" , COUNT(*) FROM public."Doctors" GROUP BY public."Doctors"."specialization" ORDER BY  public."Doctors"."specialization" ASC`)

        return NextResponse.json({ status: true, videodetail, videolist, doctordetail, specialization });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const category = input.get('category');
    const sort = input.get('sort');
    const views = JSON.parse(input.get('value'));
    const specializations = JSON.parse(input.get('specialization'));
    console.log(category, sort, views, specializations);
    if (category !== 'null') {
        specializations.push(category);
    }

    const videomodel = await videoModel();
    const connection = await connectTodb();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {
        const specialization = await connection.query(`SELECT public."Videos"."specialization", COUNT(*) FROM public."Videos" GROUP BY public."Videos"."specialization" ORDER BY  public."Videos"."specialization" ASC`)

        if (specializations.length > 0) {
            const { rows, count } = await videomodel.findAndCountAll({

                where: {
                    specialization: {
                        [Op.in]: [...new Set(specializations)]
                    }, videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views }
                },
                limit: 9,
                offset: (page - 1) * 9,
                order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']]
            })


            return NextResponse.json({ status: true, videolist: rows, totalItems: count, specialization });

        }
        else {

            const { rows, count } = await videomodel.findAndCountAll({

                where: { videoStatus: true, [Op.or]: { videoTitle: { [Op.iLike]: `%${name}%` }, videoId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views } },
                limit: 9,
                offset: (page - 1) * 9,
                order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']]
            })



            return NextResponse.json({ status: true, videolist: rows, totalItems: count, specialization });

        }




    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function PATCH(request) {
    const { videoId } = await request.json();
    const videomodel = await videoModel();
    if (!videomodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const result = await videomodel.increment('views', {
            by: 1,
            where: { videoId },
            returning: true
        });


        return NextResponse.json({ status: true, views: result[0][0][0].views });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}