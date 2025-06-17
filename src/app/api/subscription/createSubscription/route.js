import { subscriptionsModel } from "../../../models/subscriptions.model";
import { NextResponse } from 'next/server'
import moment from 'moment'
import { Op } from "sequelize";

function calculateDuration(start, end) {
    let startDate = moment(start, "YYYY-MM-DD");
    let endDate = moment(end, "YYYY-MM-DD");

    if (!startDate.isValid() || !endDate.isValid()) {
        return "Invalid dates";
    }

    let duration = endDate.diff(startDate, "days");
    return `${duration} days`;
}



export async function POST(request) {

    const { subscriptionName,
        duration,
        subscriptionType,
        price
    } = await request.json();
    const subscriptionsmodel = await subscriptionsModel();

    if (!subscriptionsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await subscriptionsmodel.create({


            subscriptionName,
            duration,
            subscriptionType,
            // duration: calculateDuration(startDate, endDate),
            price






        });

        return NextResponse.json({ status: true, message: 'subscriptions created successfully' });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}

export async function PUT(request) {

    const { subscriptionName,

        price, subscriptionId, status
    } = await request.json();
    const subscriptionsmodel = await subscriptionsModel();

    if (!subscriptionsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await subscriptionsmodel.update({


            subscriptionName,


            price, status

        }, { where: { subscriptionId } });

        return NextResponse.json({ status: true, message: 'Successfull!' });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}



export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const subscriptionsmodel = await subscriptionsModel();

    if (!subscriptionsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        const { rows, count } = await subscriptionsmodel.findAndCountAll({

            limit: 10,
            offset: name === "" ? (page - 1) * 10 : 0,
            where: { [Op.or]: { subscriptionName: { [Op.iLike]: `%${name}%` }, subscriptionId: { [Op.iLike]: `%${name}%` } } },
            order: [['createdAt', 'DESC']]
        })


        return NextResponse.json({ status: true, subscriptionlist: rows, totalItems: count });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}


export async function DELETE(request) {

    const { subscriptionId } = await request.json();
    const subscriptionsmodel = await subscriptionsModel();
    if (!subscriptionsmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await subscriptionsmodel.destroy({
            where: { subscriptionId }
        })

        return NextResponse.json({ status: true, message: "subscription deleted successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}
