import { extractErrorMessage } from '../../../../../utils/errorMessage'
import { NextResponse } from 'next/server'
import { journalsModel } from '../../../../models/journals.model'
import { Op } from 'sequelize';
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const journalmodel = await journalsModel();
    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await journalmodel.findAndCountAll({

            where: { journalStatus: 'published', [Op.or]: { journalsId: { [Op.iLike]: `%${name}%` }, journalsUrl: { [Op.iLike]: `%${name}%` } } },
            limit: 9,
            offset: (page - 1) * 9,

            order: [['createdAt', 'DESC']]
        })




        return NextResponse.json({ status: true, journallist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}