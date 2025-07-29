import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../models/doctor.model.js";
import { Op } from "sequelize";
import { connectTodb } from "../../../database/database.js";
import { articleModel } from "../../../models/article.model";

export async function POST(request) {

    const { doctorId } = await request.json();
    const doctormodel = await doctorModel();
    const Article = await articleModel();
    const connection = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const doctordetail = await connection.query(`SELECT public."Doctors"."doctorId", public."Doctors"."userId",public."Doctors"."doctorName", public."Doctors"."email", public."Doctors"."number", public."Doctors"."address", public."Doctors"."specialization",  public."Doctors"."qualification", public."Doctors"."profileImage", public."Doctors"."experience", public."Doctors"."gallery",public."Doctors"."city",ARRAY_AGG(jsonb_build_object('thumbnailImage',public."Videos"."thumbnailImage",'specialization',public."Videos"."specialization", 'videoId', public."Videos"."videoId",'doctorName', public."Videos"."doctorName",'views',public."Videos"."views",'videoTitle',public."Videos"."videoTitle",'publishedDate',public."Videos"."publishedDate")) AS videoList FROM public."Doctors" LEFT JOIN public."Videos" ON public."Doctors"."userId"=public."Videos"."userId" WHERE public."Doctors"."doctorId"=${doctorId}::text GROUP BY public."Doctors"."doctorId"`)

        const doctorlist = await doctormodel.findAll({
            limit: 10,
            where: { status: true },
            order: [['createdAt', 'DESC']],
            attributes: ['qualification', 'profileImage', 'doctorId', 'doctorName']
        })


        const articlelist = await Article.findAll({
            where: {
                articleAuthor: {
                    [Op.contains]: [{ userId: doctordetail[0][0].userId }],

                }
            },
            attributes: ['articleId', 'articleTitle', 'publishedDate', 'thumbnailImage', 'articleSummary']
        })
        return NextResponse.json({ status: true, doctordetail: doctordetail[0][0], doctorlist, articlelist });


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
    const category = input.get('category');
    const sort = input.get('sort');
    const views = JSON.parse(input.get('value'));
    const specializations = JSON.parse(input.get('specialization'));
    const location = JSON.parse(input.get('location'));
    console.log(category, sort, views, specializations);
    if (category !== 'null') {
        specializations.push(category);
    }
    const doctormodel = await doctorModel();
    const connection = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const specialization = await connection.query(`SELECT public."Doctors"."specialization", COUNT(*) FROM public."Doctors" GROUP BY public."Doctors"."specialization" ORDER BY  public."Doctors"."specialization" ASC`)

        let where =  {
            status: true, [Op.or]: { doctorName: { [Op.iLike]: `%${name}%` }, doctorId: { [Op.iLike]: `%${name}%` } }, views: { [Op.between]: views }
        };

        if (specializations.length > 0) {

            where.specialization = {
                [Op.in]: [...new Set(specializations)]
            };

        }

        if (location.length > 0) {
            where.city = { [Op.in]: location }
        }


        const { rows, count } = await doctormodel.findAndCountAll({

            where: where,
            limit: 10,
            offset: (page - 1) * 10,
            order: sort === 'select' ? [['views', 'DESC'], ['createdAt', 'DESC']] : sort === 'Newest' ? [['createdAt', 'DESC']] : sort === 'Oldest' ? [['createdAt', 'ASC']] : [['views', 'DESC']],
            attributes: ['shortDescription', 'profileImage', 'doctorId', 'doctorName', 'specialization', 'zip']
        })

        
        
        return NextResponse.json({ status: true, doctorlist: rows, totalItems: count, specialization });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}