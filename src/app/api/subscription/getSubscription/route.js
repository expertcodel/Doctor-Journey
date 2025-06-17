
import { subscriptionsModel } from "../../.././models/subscriptions.model";
import { NextResponse } from 'next/server'


export async function GET() {


    const subscriptionsmodel = await subscriptionsModel();
    if (!subscriptionsmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }
    try {

        const subscriptionlist = await subscriptionsmodel.findAll({ where: { status: true }, order: [['id', 'ASC']] });
        return NextResponse.json({ status: true, subscriptionlist });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}