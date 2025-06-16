import { publishJournalmodel } from "../../../models/publish_journal_model";
import { articleModel } from "../../../../app/models/article.model";
import { NextResponse } from "next/server";
import { journalsModel } from "../../../../app/models/journals.model";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { fileUploader } from '../../../../utils/fileUploader'
import { Op } from "sequelize";


export async function POST(request) {


    const input = await request.formData();
    const file = input.get('file');
    const { volume, issue, publishDate, journalsId, editorialDetails, journalsUrl, price, check } = JSON.parse(input.get('data'));

    console.log(volume, issue, publishDate, journalsId, editorialDetails, journalsUrl, price, check, file, "data");
    // const publishJournal = await publishJournalmodel();
    const journalmodel = await journalsModel();
    const articlemodel = await articleModel();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {


        let image;
        if (file !== 'null') {
            image = await fileUploader(file);
        }

        await journalmodel.update({
            volume, issue, publishDate, journalsId, imageUrl: image && image,
            coverSummary: editorialDetails[0], editorialDetails: editorialDetails[1], subscription: editorialDetails[2],
            journalsUrl, price, journalStatus: 'published'
        }, { where: { journalsId } });

        await articlemodel.update({ journalsId, volume, articleStatus: 'published' }, { where: { articleId: { [Op.in]: check } } });
        return NextResponse.json({ status: true, message: "journal published sucessfully" });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

    //return NextResponse.json({status:false,message:"database error occured!"});


}


export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const journalmodel = await journalsModel();
    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        // const publishedJournallist = await sequelize.findAll();
        const { rows, count } = await journalmodel.findAndCountAll({

            limit: 10,
            offset: name === "" ? (page - 1) * 10 : 0,
            where: { [Op.or]: { journalsName: { [Op.iLike]: `%${name}%` }, journalsId: { [Op.iLike]: `%${name}%` } }, journalStatus: 'published' },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, publishedJournallist: rows, totalItems: count });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }

}