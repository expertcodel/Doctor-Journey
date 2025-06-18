"use server"
import { extractErrorMessage } from '../../../utils/errorMessage';
import { otpModel } from '../../models/otp.model'
import { NextResponse } from 'next/server';
import { UserModel } from '../../../app/models/user.model';
import bcrypt from 'bcrypt'
import {sendEmail } from '../../../utils/welcomeMail.js'

export async function POST(request) {
    const { data, otp } = await request.json();
    const otpmodel = await otpModel();
    const user = await UserModel();
    if (!otpmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {


        const checkOtp = await otpmodel.findOne({ where: { email: data.email } });
        if (checkOtp.otp !== otp) {
            return NextResponse.json({ status: false, message: "Otp didn't matched!" });
        }

        await otpmodel.update({ verified: true }, { where: { email: data.email } });
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);

        await user.create({

            name: data.name,
            email: data.email,
            password: hashedPassword,
            mobile_number: data.number,
            joining_date: new Date().toLocaleDateString(),
            userId: String(Date.now())

        })

        await sendEmail(data.name,data.email);
        return NextResponse.json({ status: true, message: "User created successfully!" });


    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


