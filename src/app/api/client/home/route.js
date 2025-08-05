import { blogModel } from "../../../models/blog.model";
import { testimonialModel } from "../../../models/testimonials.model";
import { doctorModel } from "../../../models/doctor.model";
import { videoModel } from "../../../models/video.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { connectTodb } from "../../../../app/database/database";
export async function GET() {


    const blogmodel = await blogModel();
    const testimonialmodel = await testimonialModel();
    const doctormodel = await doctorModel();
    const videomodel = await videoModel();
    const connection = await connectTodb();

    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {



        const dataList = await Promise.all([blogmodel.findAll({
            limit: 3,
            order: [['blogSerial', 'ASC']],
            attributes: ['blogImage', 'publishedDate', 'blogDescription', 'blogTitle', 'blogUrl', 'blogId'],
            where: { blogStatus: true }
        }), testimonialmodel.findAll({ where: { status: true }, order: [['createdAt', 'DESC']] }), doctormodel.findAll({ limit: 6, order: [['createdAt', 'DESC']], attributes: ['profileImage', 'qualification', 'doctorId', 'doctorName', 'specialization','userId'], where: { status: true } }), videomodel.findAll({
            limit: 6, order: [
                ['views', 'DESC'],
                ['createdAt', 'DESC']
            ]
            , attributes: ['thumbnailImage', 'specialization', 'videoId', 'doctorName', 'views', 'videoTitle', 'publishedDate'], where: { videoStatus: true }
        }), connection.query(`SELECT 
    d."departmentName", 
    d."icon", 
    COUNT(v."userId") AS "count"
FROM 
    public."Videos" v
INNER JOIN 
    public."Users" u ON v."userId" = u."userId"
   
INNER JOIN 
    public."Departments" d ON u."department_id" = d."id"
WHERE v."videoStatus"=true
GROUP BY 
    d."departmentName", d."icon"
ORDER BY 
    d."departmentName" ASC;
`), videomodel.findAll({
            limit: 2, order: [
                ['views', 'DESC'],
                ['createdAt', 'DESC']
            ]
            , attributes: ['thumbnailImage', 'specialization', 'videoId', 'doctorName', 'views', 'videoTitle', 'publishedDate', 'videoContent'], where: { videoStatus: true }
        })
        ])

        return NextResponse.json({ status: true, bloglist: dataList[0], testimoniallist: dataList[1], doctorprofile: dataList[2], videolist: dataList[3], specialization: dataList[4][0], popularVideo: dataList[5] });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}