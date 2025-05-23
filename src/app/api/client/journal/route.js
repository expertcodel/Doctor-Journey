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


        const dataModel = await Promise.all([sliderModel(), offerModel(), doctorModel(), connectTodb()])
        const dataList = await Promise.all([dataModel[0].findAll({ order: [['sliderSerial', 'ASC']] }), dataModel[1].findAll({
            where: { status: true },
            order: [['createdAt', 'DESC']]

        }), dataModel[2].findAll({ limit: 8, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId', 'doctorName'], where: { status: true } }), dataModel[3].query(`SELECT public."Publishjournals"."journalsId", public."Publishjournals"."journalTitle", public."Publishjournals"."price", public."Publishjournals"."imageUrl", public."Publishjournals"."publishDate", public."Publishjournals"."coverSummary",  public."Journals"."publisherName" FROM public."Publishjournals" INNER JOIN public."Journals" ON public."Publishjournals"."journalsId"=public."Journals"."journalsId" ORDER BY public."Publishjournals"."createdAt" DESC LIMIT 10`)])

        return NextResponse.json({ status: true, sliderlist: dataList[0], offerlist: dataList[1], doctorlist: dataList[2], journallist: dataList[3] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function POST(request) {

    const { journalsId } = await request.json();
    const journalmodel = await publishJournalmodel();
    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }
    try {


        const journaldata = await Promise.all([journalmodel.findOne({ where: { journalsId } }), journalmodel.findAll({ limit: 4 })]);
        return NextResponse.json({ status: true, journaldetail: journaldata[0], journallist: journaldata[1] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}