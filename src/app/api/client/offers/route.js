import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { offerModel } from "../../../../app/models/offer.model";

export async function GET() {

    const offermodel = await offerModel();
    if (!offermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const offerlist = await offermodel.findAll({
            where: {status:true},
            order: [['createdAt', 'DESC']]

        })

        return NextResponse.json({ status: true, offerlist});

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}