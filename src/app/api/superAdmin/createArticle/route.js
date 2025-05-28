import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'
import { fileUploader } from "../../../../utils/fileUploader";
import { extractErrorMessage } from "../../../../utils/errorMessage";

function randomNumbers() {
    return String(Math.floor((Math.random() * 9000) + 1000));
}

export async function POST(request) {

    const input = await request.formData();
    const {articleTitle, primaryAuthor, secondaryAuthor, articleSummary, DOI, price, remarks, userId, contentList } = JSON.parse(input.get('data'));
    const file=input.get('file');

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
            thumbnailImage:thumbnailImage && thumbnailImage
        })

        return NextResponse.json({ status: true, message: "article saved successfully!" });


    } catch (error) {

     
        
        const message=extractErrorMessage(error);
        console.log("some error occured", message);
        return NextResponse.json({ status: false, message });


    }

  



}

export async function GET() {

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const articles = await article.findAll({ order: [['id', 'ASC']] });
    return NextResponse.json({ status: true, articles });

}