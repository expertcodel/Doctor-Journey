import { blogModel } from "../../../models/blog.model";
import { testimonialModel } from "../../../models/testimonials.model";
import { doctorModel } from "../../../models/doctor.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
export async function GET() {


    const blogmodel = await blogModel();
    const testimonialmodel = await testimonialModel();
    const doctormodel = await doctorModel();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        const dataList = await Promise.all([blogmodel.findAll({
            limit: 3,
            order: [['blogSerial', 'ASC']],
            attributes: ['blogImage', 'publishedDate', 'blogDescription', 'blogTitle', 'blogUrl', 'blogId'],
            where: { blogStatus: true }
        }), testimonialmodel.findAll(), doctormodel.findAll({ limit: 8, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId','doctorName'], where: { status: true } })])
        return NextResponse.json({ status: true, bloglist: dataList[0], testimoniallist: dataList[1], doctorprofile: dataList[2] });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}