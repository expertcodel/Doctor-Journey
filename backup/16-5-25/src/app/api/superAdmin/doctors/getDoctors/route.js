import { extractErrorMessage } from "../../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../../models/doctor.model";


export async function GET(request) {

  
    const doctormodel = await doctorModel();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const doctorlist = await doctormodel.findAll({

            attributes:['doctorId','doctorName','specialization'],
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, doctorlist });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}