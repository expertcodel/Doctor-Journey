import { subscriptionModel } from "../../../../app/models/subscription.model";
import { subscriptionsModel } from '../../../models/subscriptions.model'
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from "sequelize";
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const userId = input.get('userId');
    const subscriptionmodel = await subscriptionModel();
    const subscriptionsmodel = await subscriptionsModel();
    if (!subscriptionmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const subscriptionslist = await subscriptionsmodel.findAll({ where: { status: true }, order: [['id', 'ASC']] });
        const { rows, count } = await subscriptionmodel.findAndCountAll({

            where: { userId, [Op.or]: { subscriptionId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, subscriptionlist: rows, totalItems: count, subscriptionslist });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}