import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from "sequelize";
export async function POST(request) {

    const { journalsName, journalsIsbn, publisherName, rights, frequency } = await request.json();
    const journalsmodel = await journalsModel();
    if (!journalsmodel) {
        return NextResponse.json({ status: false, message: 'database error' });
    }


    try {


        await journalsmodel.create({

            journalsName,
            journalsIsbn,
            publisherName,
            rights,
            frequency

        })

        return NextResponse.json({ status: true, message: 'Journals created successfully' });

    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });

    }



}

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

                limit: 10,
                offset:name==="" ? (page - 1) * 10 : 0,
                where: { [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } } },
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await journal.findAndCountAll({

                limit: 10,
                offset:name==="" ? (page - 1) * 10 : 0,
                where: { userId, [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } } },
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });

        }


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}