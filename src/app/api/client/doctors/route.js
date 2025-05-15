import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../models/doctor.model.js";


export async function POST(request) {

    const {doctorId} = await request.json();
    const doctormodel = await doctorModel();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       

        const doctordetail=await doctormodel.findOne({
           where:{doctorId}
        })

        return NextResponse.json({status: true,doctordetail});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}