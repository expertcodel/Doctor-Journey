import { paymentModel } from "../../../../app/models/payment.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const userId = input.get('userId');


    const paymentmodel = await paymentModel();
    if (!paymentmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows } = await paymentmodel.findAndCountAll({

            limit: 5,
            where: { userId },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, paymentlist: rows });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}