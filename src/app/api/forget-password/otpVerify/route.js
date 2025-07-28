"use server"
import { extractErrorMessage } from '../../../../utils/errorMessage';
import { NextResponse } from 'next/server';
import { UserModel } from '../../../../app/models/user.model';
//import { sendEmail } from '../../../../utils/welcomeMail.js'


export async function POST(request) {

    const { email,otp} = await request.json();
    const usermodel = await UserModel();
    if (!usermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {


        const isValiduser = await usermodel.findOne({ where: { email: email } });
        if (isValiduser.userOtp !== otp) {
            return NextResponse.json({ status: false, message: "Otp didn't matched!" });
        }

       return NextResponse.json({ status: true, message: "Otp verified successfully!" });


    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


