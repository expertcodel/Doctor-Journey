"use server"
import { NextResponse } from 'next/server';
import { articleModel } from '../../../models/article.model'
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { UserModel } from '../../../../app/models/user.model';
export async function POST(request) {
    const { articleId } = await request.json();
    const articlemodel = await articleModel();
    const usermodel=await UserModel();
    if (!articlemodel) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    try {

        const articledetail = await articlemodel.findOne({ where: { articleId } });
        const {rows} = await usermodel.findAndCountAll({
            limit: 10,
            where: {status:true},
        })
        return NextResponse.json({ status: true, articledetail,userlist:rows });

    } catch (error) {

        const message = extractErrorMessage(error);
        console.log("some error occured", message);
        return NextResponse.json({ status: false, message });

    }



}

export async function GET() {

    const article = await articleModel();
    if (!article) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const articles = await article.findAll({ where: { articleStatus: 'published' }, order: [['id', 'ASC']] });
    return NextResponse.json({ status: true, articles });

}