import { sliderModel } from "../../../models/slider.model";
import { offerModel } from "../../../models/offer.model";
import { NextResponse } from 'next/server'
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { doctorModel } from "../../../models/doctor.model";
// import { publishJournalmodel } from "../../../models/publish_journal_model";
import { connectTodb } from "../../../database/database";
import { journalsModel } from "../../../models/journals.model";
import { articleModel } from "../../../models/article.model";
import { Op } from "sequelize";
export async function GET() {

    try {


        const dataModel = await Promise.all([sliderModel(), offerModel(), doctorModel(), journalsModel(), journalsModel(), connectTodb()
        ])
        const dataList = await Promise.all([dataModel[0].findAll({ order: [['sliderSerial', 'ASC']] }), dataModel[1].findAll({
            where: { status: true },
            order: [['createdAt', 'DESC']]

        }), dataModel[2].findAll({ limit: 8, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId', 'doctorName'], where: { status: true } }), dataModel[3].findAll({ limit: 10, order: [['createdAt', 'DESC']], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 4, offset: 0, attributes: ['imageUrl', 'price', 'price_level_1','journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 2, order: [['createdAt', 'DESC']], attributes: ['imageUrl', 'price','price_level_1', 'journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 4, offset: 0, attributes: ['imageUrl', 'price','price_level_1', 'journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[5].query(`SELECT 
    d."departmentName", 
    d."icon", 
    COUNT(v."userId") AS "count"
FROM 
    public."Videos" v
INNER JOIN 
    public."Users" u ON v."userId" = u."userId"
   
INNER JOIN 
    public."Departments" d ON u."department_id" = d."id"
WHERE v."videoStatus"=true
GROUP BY 
    d."departmentName", d."icon"
ORDER BY 
    d."departmentName" ASC;
`)])

        return NextResponse.json({ status: true, sliderlist: dataList[0], offerlist: dataList[1], doctorlist: dataList[2], journallist: dataList[3], journalleftlist: dataList[4], journalcenterlist: dataList[5], journalrightlist: dataList[6], specialization: dataList[7][0] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function POST(request) {

    const { journalsUrl } = await request.json();
    const journalmodel = await journalsModel();
    const article = await articleModel();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }
    try {


        const journalDetail = await journalmodel.findOne({ where: { journalsUrl } });
        const journaldata = await Promise.all([journalmodel.findAll({ limit: 4, where: { journalStatus: 'published' } }), journalmodel.findAll({ where: { parent_journal: journalDetail.parent_journal } }), article.findAll({ attributes: ['articleId', 'articleTitle', 'articleAuthor', 'articleSummary'], where: { status: true, articleStatus: 'published', journalsId: journalDetail.journalsId } })]);
        // console.log(journaldata[1],journalDetail.journalsId,'listhh');

        return NextResponse.json({ status: true, journaldetail: journalDetail, journallist: journaldata[0], journalversion: journaldata[1], articlelist: journaldata[2] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}



