import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { activityModel } from "@/app/models/activity.model";
import jwt from 'jsonwebtoken'

export async function POST(request) {
    const cookie = await cookies();
    const activitymodel = await activityModel();
    const token = cookie.get('token');
    const userData = cookie.get('userData');


    try {

        const isValiduser = await jwt.verify(token.value, process.env.AUTHENTICATION_KEY);
        if (token) {
            cookie.delete('token');
        }

        if (userData) {
            cookie.delete('userData');
        }
        
        await activitymodel.create({

            userId: isValiduser.userId,
            name: isValiduser.name,
            usertype: isValiduser.usertype,
            activity: 'logout',
            time: new Date().toLocaleString()

        })
        return NextResponse.json({ status: true, message: "cookies deleted successfully!", url: '/' });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }

}