import { articleModel } from '../../../../models/article.model'
import { NextResponse } from 'next/server'
import { Op } from 'sequelize';
import { extractErrorMessage } from "../../../../../utils/errorMessage";
export async function GET(request) {

    const articlemodel = await articleModel();
    const input = new URL(request.url).searchParams;
    const name = input.get('name');


    try {

        const { rows, count } = await articlemodel.findAndCountAll({
            limit: 10,
            attributes:['articleId','articleStatus','articleTitle','publishedDate'],
            where: { [Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } }, articleStatus: 'approved' }
        });

        return NextResponse.json({ status: true, response: rows });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }


}