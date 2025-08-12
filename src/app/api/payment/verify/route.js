
import crypto from "crypto";
import { NextResponse } from "next/server";
import { paymentModel } from "../../../models/payment.model";
import { subscriptionModel } from "../../../models/subscription.model";
import { journal_registrationModel } from "../../../models/journal_subscription.model";
import { UserModel } from "../../../models/user.model";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { journalSubscriptionModel } from "../../../models/journal-subscription.model";
import dayjs from 'dayjs'

async function sendEmail(email, password, name) {

    const config = {

        service: 'gmail',
        auth: {

            user: "rohitkumarchau656@gmail.com",
            pass: "pihc knoi rbca lrif"
        }
    }

    try {

        const createMail = nodemailer.createTransport(config);
        await createMail.sendMail({

            from: { name: "Doctor's Journey", address: 'rohitkumarchau656@gmail.com' },
            to: email.trim(),
            subject: "Welcome to Doctor's Journey",
            html: `
                <div style="/* justify-content: center; */font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;max-width:600px;display:block;margin:0 auto;padding:20px;/* display: flex; *//* align-items: center; */"><div class="adM">
                    </div><table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;border-radius:3px;margin:0;border:none">
                        <tbody><tr style="font-family:'Roboto',sans-serif;font-size:14px;margin:0">
                            <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;color:#495057;font-size:14px;vertical-align:top;margin:0;padding:30px;border-radius:7px;background-color:#fff" valign="top">

                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                    <tbody><tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;width: 100%;">
                                        <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                            <div style="text-align:center;margin-bottom:15px">
                                                <img src="https://doctorsjourney.in/images/logo.svg" alt="Doctor's Journey" height="23" class="CToWUd" data-bit="iit">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                        <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;line-height:1.5;color:#000000;font-size:24px;vertical-align:top;margin:0;padding:0 0 10px;text-align:left;font-weight:500" valign="top">
                                            Dear ${name[0].toUpperCase() + name.slice(1, name.length)} 
                                        </td>
                                    </tr>
                                    <tr style="align-items: left;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;display: flex;/* align-content: left; */">
                                        <td style="font-family:'Roboto',sans-serif;color:#313131;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">

                                        Thank you for your interest in exploring medical resources with DoctorsJourney.
    here is your, password <b>${password}</b> Now you can login by using this password or you can also change your password by clicking on forgot-password.
                                            
                                        </td>
                                    </tr>
                                    

                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;border-top:1px solid #e9ebec;display: flex;">
                                        <td style="color:#313131;text-align:left;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                            <p>Warm regards,</p>
                    <p>Doctor's Journey</p>
                                        </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody></table><div class="yj6qo"></div><div class="adL">
                    
                </div>
                </div>
            `

        })

        return true;

    } catch (error) {

        console.log(error);
        return false;
    }


}



function addDays(date = new Date(), days = 0) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}
const today = new Date();

function generateRandomPassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password += randomChar;
    }
    return password;
}


async function createUser(data, user) {

    const { name, number, email, address, city, zip, country } = data;
    const password = generateRandomPassword();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {

        const id = String(Date.now());
        await user.create({
            name, mobile_number: number, email, address, city, zip, country, password: hashedPassword, joining_date: new Date().toLocaleDateString(),
            userId: id
        })
        await sendEmail(email, password, name);
        return id;

    } catch (error) {

        console.log(error);
        return null
    }

}

function generate13DigitNumber() {
  const min = 1e12; // 1000000000000
  const max = 9.999999999999e12; // Just under 10 trillion
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}


export async function POST(req) {

    const body = await req.json();
    const paymentmodel = await paymentModel();
    const subscriptionmodel = await subscriptionModel();
    const journals_registrationmodel = await journal_registrationModel();
    const journalSubscriptionmodel=await journalSubscriptionModel();
    const user = await UserModel();
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userData,
        amount, subscriptionsId, subscriptionName, subscriptionType, duration, path, id, email } = body;


    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {

        if (path === '/register-journal') {

            const isExistedemail = await user.findOne({ where: { email } })
            let user_id;
            let is_updated;
            let data;
            if (!isExistedemail) {

                const data = await journals_registrationmodel.findOne({ where: { id } });
                let newid = await createUser(data, user);
                if (!newid) {
                    return NextResponse.json({ status: false, message: "user couldn't created" });
                }

                const [updatedCount,updatedRows] = await journals_registrationmodel.update({
                    is_paid: true, userId: newid && newid
                }, { where: { id } })

                if (updatedCount > 0) {

                    is_updated = true
                    user_id = newid
                    data=updatedRows[0].toJSON()
                }
            }
            else {


                const [updatedCount, updatedRows] = await journals_registrationmodel.update(
                    { is_paid: true, userId: isExistedemail.userId },
                    {
                        where: { id },
                        returning: true
                    }
                );


                if (updatedCount > 0) {

                    is_updated = true
                    user_id = isExistedemail.userId
                    data=updatedRows[0].toJSON()
                }

                console.log(updatedRows,"updatedRows");
            }

            console.log(data,"gshhsd");
            


            if (is_updated) {

                const durationMap = {
                    "Monthly": 1,
                    "Quarterly": 4,
                    "Quaterly": 4,
                    "Yearly": 12,
                    "Half-Yearly":6
                };

                const startDate = dayjs();
                const monthsToAdd = durationMap[data.plans.plan3.duration] || 0;
                const endDate = startDate.add(monthsToAdd, 'month');

                await journalSubscriptionmodel.create({
                    userId:user_id,
                    startDate: startDate.toDate(),
                    endDate: endDate.toDate(),
                    duration_type: data.plans.plan3.duration,
                    duration_value: monthsToAdd,
                    status: true,
                    subscriptionId:generate13DigitNumber(),
                    subscriptionName:data.plans.plan3.plan,
                    journal_id:data.journal_id,
                    journal_name:data.journal_name,
                    amount:data.amount
                });

            }

            return NextResponse.json({ status: true, razorpay_signature });

        }
        else {
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
        }
    } catch (err) {
        console.log(err, "error");

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// const now = dayjs();
// const subscription = await subscriptionmodel.findOne({ where: { userId } });

// if (now.isAfter(subscription.end_date)) {
//     // mark as expired
//     subscription.status = 'expired';
//     await subscription.save();
// }
