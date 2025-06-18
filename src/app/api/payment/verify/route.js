
import crypto from "crypto";
import { NextResponse } from "next/server";
import { paymentModel } from "../../../models/payment.model";
import { subscriptionModel } from "../../../models/subscription.model";

function addDays(date = new Date(), days = 0) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}
const today = new Date();




export async function POST(req) {

    const body = await req.json();
    const paymentmodel = await paymentModel();
    const subscriptionmodel = await subscriptionModel();
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userData,
        amount, subscriptionsId, subscriptionName, subscriptionType, duration
    } = body;

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        // Insert payment
        await paymentmodel.create({

            userId: userData.userId,
            // orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            paymentPrice: amount,
            status: true,
            paymentDuration: duration,
            paymentName: subscriptionName,


        });

        // Insert subscription
        await subscriptionmodel.create({

            userId: userData.userId,
            subscriptionsId,
            subscriptionPrice: amount,
            status: true,
            subscriptionType,
            subscriptionName,
            subscriptionDuration: duration,
            startDate: new Date().toLocaleDateString(),
            endDate: formatDate(addDays(today, 15))

        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.log(err, "error");

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
