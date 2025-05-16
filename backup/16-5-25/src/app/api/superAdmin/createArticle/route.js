import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'

function randomNumbers() {
    return String(Math.floor((Math.random() * 9000) + 1000));
}

export async function POST(request) {
    
    const { articleTitle,primaryAuthor,secondaryAuthor, articleSummary,DOI,price,remarks,userId,contentList} = await request.json();
    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }
     
    try {

        console.log(contentList)

        await article.create({

            userId,
            articleId: String(new Date().getMilliseconds()) + randomNumbers(),
            articleTitle,
            Abstract:contentList[0],
            Keywords:contentList[1],
            Introduction:contentList[2],
            Methods:contentList[3],
            Results:contentList[4],
            Discussion:contentList[5],
            Conclusion:contentList[6],
            References:contentList[7],
            Abbreviations:contentList[8],
            Copyright:contentList[9],
            articleAuthor: { primary: primaryAuthor, secondary: secondaryAuthor },
            articleSummary,
            DOI,
            price,
            remarks
        })

        return NextResponse.json({ status: true, message: "article saved successfully!" });
        
        
    } catch (error) {


        console.log("some error occured", error);

        
    }
    
    return NextResponse.json({ status: false, message: "some error occured!" });
    //console.log(contentList)
   

    

}

export async function GET() {

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const articles = await article.findAll({order:[['id','ASC']]});
    return NextResponse.json({ status: true, articles });

}