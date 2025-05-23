import { articleModel } from "../../../../app/models/article.model";
import { NextResponse } from "next/server";


export async function GET() {

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const articles = await article.findAll({where:{articleStatus:'pending'},order:[['id','ASC']]});
    return NextResponse.json({ status: true,articles});

}