import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'
import { fileUploader } from "../../../../utils/fileUploader";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from 'sequelize';
function randomNumbers() {
    return String(Math.floor((Math.random() * 9000) + 1000));
}

export async function POST(request) {

    const input = await request.formData();
    const { articleTitle, primaryAuthor, secondaryAuthor, articleSummary, DOI, price, remarks, userId, contentList } = JSON.parse(input.get('data'));
    const file = input.get('file');

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    try {





        let thumbnailImage;
        if (file !== 'null') {
            thumbnailImage = await fileUploader(file);
        }

        await article.create({

            userId,
            articleId: String(new Date().getMilliseconds()) + randomNumbers(),
            articleTitle,
            Abstract: contentList[0],
            Keywords: contentList[1],
            Introduction: contentList[2],
            Methods: contentList[3],
            Results: contentList[4],
            Discussion: contentList[5],
            Conclusion: contentList[6],
            References: contentList[7],
            Abbreviations: contentList[8],
            Copyright: contentList[9],
            articleAuthor: primaryAuthor,
            articleSummary,
            DOI,
            price,
            remarks,
            thumbnailImage: thumbnailImage && thumbnailImage
        })

        return NextResponse.json({ status: true, message: "article saved successfully!" });


    } catch (error) {



        const message = extractErrorMessage(error);
        console.log("some error occured", message);
        return NextResponse.json({ status: false, message });


    }





}

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

                where: { [Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } } },
                limit: 10,
                offset: (page - 1) * 10,

                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, articlelist: rows, totalItems: count });
        }
        else {

            const { rows, count } = await articlemodel.findAndCountAll({

                limit: 10,
                offset: name === "" ? (page - 1) * 10 : 0,
                where: { userId, [Op.or]: { articleTitle: { [Op.iLike]: `%${name}%` }, articleId: { [Op.iLike]: `%${name}%` } } },
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, articlelist: rows, totalItems: count });

        }


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function DELETE(request) {

    const { deleteditem } = await request.json();
    const articlemodel = await articleModel();

    if (!articlemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await articlemodel.destroy({ where: { id: { [Op.in]: deleteditem } } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}