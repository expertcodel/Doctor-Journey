import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../../models/doctor.model";
import { connectTodb } from "../../../../database/database";

export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const userId = input.get('userId');
    const usertype = input.get('usertype');
    const connection=await connectTodb();
    const doctormodel = await doctorModel();
    if (!connection) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        if (usertype === 'string') {

            const doctorlist = await doctormodel.findAll({

                attributes: ['userId', 'doctorName', 'specialization'],
                order: [['createdAt', 'DESC']]
            })

            return NextResponse.json({ status: true, doctorlist });
        }
        else{

            const doctordetail=await doctormodel.findOne({

                attributes: ['userId', 'doctorName', 'specialization'],
                where: {userId}
            })

           return NextResponse.json({ status: true, doctordetail });

        }


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}