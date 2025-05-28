import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { articleModel } from "../../../models/article.model";


export async function POST(request) {

    const { articleId } = await request.json();
    const articlemodel = await articleModel();

    if (!articlemodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const articledata = await Promise.all([articlemodel.findOne({
            where: { articleId }

        }), articlemodel.findAll({
            //where: { articleStatus: 'approved' },
            limit: 10,
            order: [['createdAt', 'DESC']],
            attributes: ['publishedDate', 'thumbnailImage', 'articleId', 'articleTitle']

        })])

        return NextResponse.json({ status: true, articledetail: articledata[0], articlelist: articledata[1] });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}



export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const articlemodel = await articleModel();
    if (!articlemodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await articlemodel.findAndCountAll({

            limit: 9,
            offset: (page - 1) * 9,
            where: { [Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']],
            attributes: ['articleSummary', 'thumbnailImage', 'articleId', 'articleTitle', 'publishedDate', 'price']
        })

        return NextResponse.json({ status: true, articlelist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}