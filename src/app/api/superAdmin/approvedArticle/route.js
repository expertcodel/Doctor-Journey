import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from 'sequelize';


export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const userId = input.get('userId');
    const usertype = input.get('usertype');
    const articlemodel = await articleModel();
    if (!articlemodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }


    try {

        if (usertype === 'string') {
            const { rows, count } = await articlemodel.findAndCountAll({

                limit: 10,
                offset: (page - 1) * 10,
                where: { [Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } },articleStatus:'approved' },
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, articlelist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await articlemodel.findAndCountAll({

                limit: 10,
                offset: (page - 1) * 10,
                where: { userId,[Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } },articleStatus:'approved'},
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, articlelist: rows, totalItems: count });

        }


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }





}