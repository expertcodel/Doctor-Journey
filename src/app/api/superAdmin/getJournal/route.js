import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";
import { Op } from "sequelize";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { fileUploader } from "../../../../utils/fileUploader";
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
                offset: (page - 1) * 10,
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, journallist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await journal.findAndCountAll({

                where: { userId, [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } }, journalStatus: 'approved' },
                limit: 10,
                offset: (page - 1) * 10,

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

export async function POST(request) {
    const { journalsId } = await request.json();
    const journalmodel = await journalsModel();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const journaldetail = await journalmodel.findOne({ where: { journalsId } });
        return NextResponse.json({ status: true, journaldetail });

    } catch (error) {

        const message = extractErrorMessage(error);
        console.log("some error occured", message);
        return NextResponse.json({ status: false, message });

    }



}

export async function PATCH(request) {

    const input = await request.formData();
    const file = input.getAll('file');
    const file1 = input.get('image');
    const { journalsName, journalsIsbn, publisherName, volume, frequency, description,
        faq,  video_id, subscription_plan, journalsId } = JSON.parse(input.get('data'));

    const journalsmodel = await journalsModel();
    if (!journalsmodel) {
        return NextResponse.json({ status: false, message: 'database error' });
    }

    const isExistjournal = await journalsmodel.findOne({ where: { journalsId } });

    const isExistname = await journalsmodel.findOne({ where: { journalsName } });
    if (isExistname && isExistjournal.journalsName !== journalsName) {
        return NextResponse.json({ status: false, message: 'Journal name already exist' });
    }

    const isExistIsbn = await journalsmodel.findOne({ where: { journalsIsbn } });
    if (isExistIsbn && isExistjournal.journalsIsbn !== journalsIsbn) {
        return NextResponse.json({ status: false, message: 'ISBN number already exist' });
    }


    try {

        let image;
        if (file1 !== 'null') {
            image = await fileUploader(file1);
        }

        let imageUrl = [];
      
        for (let i = 0; i < file.length; i++) {

            if (typeof (file[i]) !== 'string') {
                const url = await fileUploader(file[i])
                imageUrl.push(url);
            }
            else {
                imageUrl.push(file[i]);
            }

        }


        await journalsmodel.update({

            journalsName,
            journalsIsbn,
            publisherName,
            video_id,
            volume,
            frequency,
            description, faqs: faq,
            journal_slider: imageUrl, subscription_plan, imageUrl: image && image

        }, { where: { journalsId } })

        return NextResponse.json({ status: true, message: 'Journals updated successfully' });

    } catch (error) {

        console.log(error, "error");
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });


    }



}