"use server"
import { extractErrorMessage } from '../../../utils/errorMessage';
import { NextResponse } from 'next/server';
import { UserModel } from '../../../app/models/user.model';
import { sendEmail } from '../../../utils/welcomeMail.js'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'
export async function POST(request) {

    const { email, name, otp, path } = await request.json();
    const usermodel = await UserModel();
    if (!usermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {


        const isValiduser = await usermodel.findOne({ where: { email: email } });
        if (isValiduser.userOtp !== otp) {
            return NextResponse.json({ status: false, message: "Otp didn't matched!" });
        }

        await usermodel.update({ emailVerified: true }, { where: { email: email } });
        await sendEmail(name, email);

        if (path === '/login') {

            let flag = false;
            if (typeof (isValiduser.usertype) === 'string') {
                flag = true;
            }
            const token = jwt.sign({ userData: isValiduser }, process.env.AUTHENTICATION_KEY, { expiresIn: '1h' })
            await cookies().set('token', token, { httpOnly: true, maxAge: 3600, path: '/' });
            return NextResponse.json({ status: 1, message: "Verified user!", url: flag ? '/dashboard' : `/user-dashboard` });
        }

        return NextResponse.json({ status: true, message: "Email verified successfully!" });


    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}


