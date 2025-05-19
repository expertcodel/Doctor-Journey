import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../models/doctor.model.js";
import { Op } from "sequelize";
import { connectTodb } from "../../../database/database.js";
export async function POST(request) {

    const { doctorId } = await request.json();
    const doctormodel = await doctorModel();
    const connection = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        // const doctordetail = await doctormodel.findOne({
        //     where: { doctorId }
        // })

        const doctordetail=await connection.query(`SELECT * , ARRAY_AGG(jsonb_build_object('thumbnailImage',public."Videos"."thumbnailImage",'specialization',public."Videos"."specialization", 'videoId', public."Videos"."videoId",'doctorName', public."Videos"."doctorName",'views',public."Videos"."views",'videoTitle',public."Videos"."videoTitle",'publishedDate',public."Videos"."publishedDate")) AS videoList FROM public."Doctors" INNER JOIN public."Videos" ON public."Doctors"."doctorId"=public."Videos"."doctorId" WHERE public."Doctors"."doctorId"=${doctorId}::text GROUP BY public."Doctors"."doctorId",public."Videos"."videoId"`)

        const doctorlist = await doctormodel.findAll({
            limit: 10,
            where: { status: true },
            order: [['createdAt', 'DESC']],
            attributes: ['qualification', 'profileImage', 'doctorId', 'doctorName']
        })

        return NextResponse.json({ status: true, doctordetail, doctorlist });


    } catch (error) {

        console.log(error);
        
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const doctormodel = await doctorModel();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await doctormodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: { [Op.or]: { doctorName: { [Op.iLike]: `%${name}%` }, doctorId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']],
            attributes: ['shortDescription', 'profileImage', 'doctorId', 'doctorName', 'specialization', 'zip']
        })

        return NextResponse.json({ status: true, doctorlist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}