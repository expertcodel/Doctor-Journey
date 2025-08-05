import { NextResponse } from "next/server";
import { journalsModel } from "../../../../models/journals.model";
import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { Op } from "sequelize";

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    
    const journal = await journalsModel();
    if (!journal) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }


    try {


        const journallist = await journal.findAll({

            where: { journalStatus: 'published', status: true, [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, journallist });




    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }

}