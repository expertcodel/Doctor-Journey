import { journal_registrationModel } from "../../../../app/models/journal_subscription.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Sequelize } from "sequelize";
import dayjs from "dayjs";
// import { Op } from "sequelize";
export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const userId = input.get('userId');
    const subscriptionmodel = await journal_registrationModel();

    if (!subscriptionmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const { rows, count } = await subscriptionmodel.findAndCountAll({
            where: { status: true, userId }, order: [['createdAt', 'DESC']], limit: 5, attributes: [

                'journal_id',
                'amount',
                'registration_number',
                'is_paid',
                'journal_name',

                [
                    Sequelize.fn(
                        'TO_CHAR',
                        Sequelize.col('createdAt'),
                        'DD Mon YYYY' // Formats the actual timestamp value
                    ),
                    'formattedDate'
                ]

            ]
        });


        const subscriptiondetail = await subscriptionmodel.findOne({

            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 1
        });

       
        return NextResponse.json({ status: true, subscriptionslist: rows, totalItems: count, subscriptiondetail });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}


export async function POST(request) {

    const { userId } = await request.json();
    const subscriptionmodel = await journal_registrationModel();

    if (!subscriptionmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const now = dayjs();
        const subscription = await subscriptionmodel.findOne({ where: { userId } });

        if (now.isAfter(subscription.end_date)) {
            // mark as expired
            subscription.status = false;
            await subscription.save();
        }

        return NextResponse.json({ status: true, subscriptionStatus:subscription.get({ plain: true }) });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}