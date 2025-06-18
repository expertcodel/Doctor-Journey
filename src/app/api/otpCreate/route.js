"use server"
import { NextResponse } from "next/server";
import { otpModel } from "../../models/otp.model";
import { UserModel } from "../../models/user.model";
import nodemailer from 'nodemailer'



async function sendEmail(email, otp, name) {

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
            subject: "Doctor's Journey otp verification",
            html: `<div style="/* justify-content: center; */font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;max-width:600px;display:block;margin:0 auto;padding:20px;/* display: flex; *//* align-items: center; */"><div class="adM">
                                            </div><table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;border-radius:3px;margin:0;border:none">
                                                <tbody><tr style="font-family:'Roboto',sans-serif;font-size:14px;margin:0">
                                                    <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;color:#495057;font-size:14px;vertical-align:top;margin:0;padding:30px;border-radius:7px;background-color:#fff" valign="top">
                                                        
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                            <tbody><tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;width: 100%;">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                                                    <div style="text-align:center;margin-bottom:15px">
                                                                        <img src="https://doctorsjourney.in/images/logo.png" alt="Doctor's Journey" height="23" class="CToWUd" data-bit="iit">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;line-height:1.5;font-size:24px;vertical-align:top;margin:0;padding:0 0 10px;text-align:center;font-weight:500" valign="top">
                                                                    Dear ${name[0].toUpperCase() + name.slice(1, name.length)} 
                                                                </td>
                                                            </tr>
                                                            <tr style="align-items: center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;display: flex;/* align-content: center; */">
                                                                <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:center" valign="top">

                                                                Thank you for your interest in exploring medical resources with DoctorsJourney.
To proceed, please enter the one-time password (OTP)  <b>${otp}</b> to verify your identity and confirm your access to the selected journal or resource.  
                                                                  
                                                                </td>
                                                            </tr>
                                                           

                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;border-top:1px solid #e9ebec;display: flex;">
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p>Warm regards,</p>
                                           <p>Doctor's Journey</p>
                                                                </td>
                                                        </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table><div class="yj6qo"></div><div class="adL">
                                           
                                        </div></div>`

        })

        return true;

    } catch (error) {

        console.log(error);
        return false;
    }


}

const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}


export async function POST(request) {

    const { email, name } = await request.json();
    const api_key = new Headers(request.headers).get('api_key');
    if (api_key !== process.env.NEXT_PUBLIC_SECRET_KEY) {
        return NextResponse.json({ status: 0, message: "Unauthorized user!" });
    }
    const usermodel = await UserModel();
    const isExisteduser = await usermodel.findOne({ where: { email } });
    if (isExisteduser) {
        return NextResponse.json({ status: 0, message: "User already existed!" });
    }

    const otp = generateOtp();
    const sent = sendEmail(email, otp, name);
    if (!sent) {
        return NextResponse.json({ status: 0, message: "some error occured!" });
    }

    const otpmodel = await otpModel();
    if (!otpmodel) {
        return NextResponse.json({ status: 0, message: "some error occured!" });
    }

    const isExist = await otpmodel.findOne({ where: { email: email } });
    if (!isExist) {
        await otpmodel.create({
            email: email,
            otp: otp
        })
    }
    else {

        await isExist.update({ otp: otp });
    }

    return NextResponse.json({ status: 1, message: "otp sent successfully!" });


}