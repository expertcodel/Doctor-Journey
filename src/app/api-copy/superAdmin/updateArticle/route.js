import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'
export async function POST(request) {
    
    const { articleId,articleTitle,primaryAuthor,secondaryAuthor, articleSummary,DOI,price,remarks,contentList} = await request.json();
    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }
     
    try {

            //console.log(contentList);
            
            await article.update({
            articleId,
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
            price:Number(price),
            remarks
        },{where:{articleId}})

        return NextResponse.json({ status: true, message: "article updated successfully!" });
        
        
    } catch (error) {


        console.log("some error occured", error);
        
    }
    

   

   

}

// export async function GET() {

//     const article = await articleModel();
//     if (!article) {
//         return NextResponse.json({ status: false, message: "some error occured" });
//     }

//     const articles = await article.findAll();
//     return NextResponse.json({ status: true, articles });

// }