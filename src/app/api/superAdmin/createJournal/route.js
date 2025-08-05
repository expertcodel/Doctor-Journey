import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";

const randomNumber = () => {

    return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(request) {

    const input = await request.formData();
    const file = input.getAll('file');
    const { journalsName, journalsIsbn, publisherName, volume, frequency, description,
        faq, parent_journal,video_id } = JSON.parse(input.get('data'));

    const journalsmodel = await journalsModel();
    if (!journalsmodel) {
        return NextResponse.json({ status: false, message: 'database error' });
    }

    const isExistname = await journalsmodel.findOne({ where: { journalsName } });
    if (isExistname) {
        return NextResponse.json({ status: false, message: 'Journal name already exist' });
    }

    const isExistIsbn = await journalsmodel.findOne({ where: { journalsIsbn } });
    if (isExistIsbn) {
        return NextResponse.json({ status: false, message: 'ISBN number already exist' });
    }


    try {

        let imageUrl = [];
        for (let i = 0; i < file.length; i++) {
            const url = await fileUploader(file[i])
            imageUrl.push(url);
        }

        const id = String(new Date().getMilliseconds()) + randomNumber()
        await journalsmodel.create({

            journalsId: id,
            journalsName,
            journalsIsbn,
            publisherName,
            video_id,
            volume,
            frequency,
            description, faqs: faq, parent_journal: parent_journal === 'select' ? id : parent_journal,
            journal_slider: imageUrl

        })

        return NextResponse.json({ status: true, message: 'Journals created successfully' });

    } catch (error) {

        console.log(error, "error");
        const message = extractErrorMessage(error);
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
                offset: (page - 1) * 10,
                where: { [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } } },
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await journal.findAndCountAll({

                limit: 10,
                offset: (page - 1) * 10,
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