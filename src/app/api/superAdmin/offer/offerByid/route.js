import { offerModel } from "../../../../models/offer.model";
import { NextResponse } from 'next/server'
import { extractErrorMessage } from "../../../../../utils/errorMessage";




export async function POST(request) {

    const { offerId } = await request.json();
    const offermodel = await offerModel();
    if (!offermodel) {
        return NextResponse.json({ status: false, message: 'database error occured' });
    }

    try {


        const offerdetail = await offermodel.findOne({ where: { offerId } });
        return NextResponse.json({ status: true, offerdetail });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });

    }



}

