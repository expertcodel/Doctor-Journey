import { sliderModel } from "../../../models/slider.model";
import { offerModel } from "../../../models/offer.model";
import { NextResponse } from 'next/server'
import { extractErrorMessage } from "../../../../utils/errorMessage";

export async function GET(request) {



    // const slidermodel = await sliderModel();

    // if (!slidermodel) {
    //     return NextResponse.json({ status: false, message: "database error occured!" });
    // }


    try {


        const dataModel = await Promise.all([sliderModel(), offerModel()])
        const dataList = await Promise.all([dataModel[0].findAll({ order: [['sliderSerial', 'ASC']] }), dataModel[1].findAll({
            where: { status: true },
            order: [['createdAt', 'DESC']]

        })])

        return NextResponse.json({ status: true, sliderlist: dataList[0], offerlist: dataList[1] });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}