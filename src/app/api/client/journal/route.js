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


        const dataModel = await Promise.all([sliderModel(), offerModel(), doctorModel(), connectTodb(),publishJournalmodel()])
        const dataList = await Promise.all([dataModel[0].findAll({ order: [['sliderSerial', 'ASC']] }), dataModel[1].findAll({
            where: { status: true },
            order: [['createdAt', 'DESC']]

        }), dataModel[2].findAll({ limit: 8, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId', 'doctorName'], where: { status: true } }), dataModel[3].query(`SELECT public."Publishjournals"."journalsId", public."Publishjournals"."journalsUrl",public."Journals"."journalsName", public."Publishjournals"."price", public."Publishjournals"."imageUrl", public."Publishjournals"."publishDate", public."Publishjournals"."coverSummary",  public."Journals"."publisherName" FROM public."Publishjournals" INNER JOIN public."Journals" ON public."Publishjournals"."journalsId"=public."Journals"."journalsId" ORDER BY public."Publishjournals"."createdAt" DESC LIMIT 10`), dataModel[4].findAll({ limit: 4,offset:0,attributes:['imageUrl','price','journalsUrl','journalsId'] }), dataModel[4].findAll({ limit: 2, order: [['createdAt', 'DESC']],attributes:['imageUrl','price','journalsUrl','journalsId'] }), dataModel[4].findAll({ limit: 4, offset: 0 ,attributes:['imageUrl','price','journalsUrl','journalsId']})])

        return NextResponse.json({ status: true, sliderlist: dataList[0], offerlist: dataList[1], doctorlist: dataList[2], journallist: dataList[3], journalleftlist: dataList[4], journalcenterlist: dataList[5], journalrightlist: dataList[6] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function POST(request) {

    const { journalsUrl } = await request.json();
    const journalmodel = await publishJournalmodel();
    const connection = await connectTodb();

    if (!journalmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }
    try {


        const journaldata = await Promise.all([connection.query(`SELECT public."Publishjournals"."journalsId", public."Publishjournals"."journalsUrl",public."Journals"."journalsName", public."Publishjournals"."price", public."Publishjournals"."imageUrl", public."Publishjournals"."publishDate", public."Publishjournals"."coverSummary",  public."Journals"."publisherName" FROM public."Publishjournals" INNER JOIN public."Journals" ON public."Publishjournals"."journalsId"=public."Journals"."journalsId" WHERE public."Publishjournals"."journalsUrl"='${journalsUrl}' ORDER BY public."Publishjournals"."createdAt" DESC LIMIT 10`), journalmodel.findAll({ limit: 4 })]);
        return NextResponse.json({ status: true, journaldetail: journaldata[0][0][0], journallist: journaldata[1] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}



