import { paymentModel } from "../../../../app/models/payment.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from "sequelize";
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const userId = input.get('userId');
    // let startDate = input.get('startDate');
    // let endDate = input.get('endDate');
    // console.log(startDate,endDate);

    // if (startDate) {
    //     startDate.setHours(0, 0, 0, 0);
    // }

    // if (endDate) {
    //     endDate.setHours(23, 59, 59, 999);
    // }



    const paymentmodel = await paymentModel();
    if (!paymentmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await paymentmodel.findAndCountAll({

            limit: 5,
            offset: (page - 1) * 5,
            where: { userId, [Op.or]: { paymentId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, paymentlist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}