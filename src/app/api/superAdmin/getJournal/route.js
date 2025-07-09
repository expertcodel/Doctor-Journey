import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";
import { Op } from "sequelize";
import { extractErrorMessage } from "../../../../utils/errorMessage";
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const userId = input.get('userId');
    const usertype = input.get('usertype');
    const journal = await journalsModel();
    if (!journal) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }


    try {

        if (usertype === 'string') {
            const { rows, count } = await journal.findAndCountAll({

                where: { [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } }, journalStatus: 'approved' },
                limit: 10,
                offset:  (page - 1) * 10 ,
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await journal.findAndCountAll({

                where: { userId, [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } }, journalStatus: 'approved' },
                limit: 10,
                offset:  (page - 1) * 10 ,

                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });

        }


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }



}


export async function DELETE(request) {

    const { deleteditem } = await request.json();
    const journalmodel = await journalsModel();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await journalmodel.destroy({ where: { id: { [Op.in]: deleteditem } } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}