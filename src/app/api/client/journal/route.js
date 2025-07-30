import { sliderModel } from "../../../models/slider.model";
import { offerModel } from "../../../models/offer.model";
import { NextResponse } from 'next/server'
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { doctorModel } from "../../../models/doctor.model";
// import { publishJournalmodel } from "../../../models/publish_journal_model";
import { connectTodb } from "../../../database/database";
import { journalsModel } from "../../../models/journals.model";
import { publishJournalmodel } from "../../../models/publish_journal_model";

export async function GET() {

    try {


        const dataModel = await Promise.all([sliderModel(), offerModel(), doctorModel(), journalsModel(), journalsModel(), connectTodb()
        ])
        const dataList = await Promise.all([dataModel[0].findAll({ order: [['sliderSerial', 'ASC']] }), dataModel[1].findAll({
            where: { status: true },
            order: [['createdAt', 'DESC']]

        }), dataModel[2].findAll({ limit: 8, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId', 'doctorName'], where: { status: true } }), dataModel[3].findAll({ limit: 10, order: [['createdAt', 'DESC']], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 4, offset: 0, attributes: ['imageUrl', 'price', 'journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 2, order: [['createdAt', 'DESC']], attributes: ['imageUrl', 'price', 'journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[4].findAll({ limit: 4, offset: 0, attributes: ['imageUrl', 'price', 'journalsUrl', 'journalsId', 'journalsName'], where: { journalStatus: 'published' } }), dataModel[5].query(`SELECT public."Videos"."specialization", COUNT(*) FROM public."Videos" GROUP BY public."Videos"."specialization" ORDER BY  public."Videos"."specialization" ASC`)])

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
    const connection = await connectTodb();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }
    try {


        const journaldata = await Promise.all([journalmodel.findOne({ where: { journalsUrl } }), journalmodel.findAll({ limit: 4, where: { journalStatus: 'published' } })]);
        return NextResponse.json({ status: true, journaldetail: journaldata[0], journallist: journaldata[1] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}



