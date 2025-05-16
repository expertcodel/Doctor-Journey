import { blogModel } from "@/app/models/blog.model";
import { NextResponse } from "next/server";
import { fileUploader } from "@/utils/fileUploader";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from "sequelize";
export async function POST(request) {

    const { blogUrl } = await request.json();
    const blogmodel = await blogModel();
   
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const blogdetail = await blogmodel.findOne({
            where: { blogUrl }
        })

      
        return NextResponse.json({ status: true, blogdetail });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}

export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { blogId, blogTitle, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl, blogStatus } = JSON.parse(input.get('data'));
    const blogmodel = await blogModel();

    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let blogImage;
        if (file !== 'null') {
            blogImage = await fileUploader(file);
        }

        await blogmodel.update({
            blogTitle, blogImage: blogImage && blogImage, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl, blogStatus
        }, { where: { blogId } })

        return NextResponse.json({ status: true, message: "blog updated successfully!" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });

    }



}


export async function DELETE(request) {

    const { blogId } = await request.json();
    const blogmodel = await blogModel();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await blogmodel.destroy({
            where: { blogId }
        })

        return NextResponse.json({ status: true, message: "blog deleted successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const url = input.get('url');
    const page = input.get('page');
    const blogmodel = await blogModel();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await blogmodel.findAndCountAll({

            limit: url === '/' ? 3 : 9,
            offset: url === '/' ? (page - 1) * 3 : (page - 1) * 9,
            where: { [Op.or]: { blogTitle: { [Op.iLike]: `%${name}%` } } },
            order: [['blogSerial', 'ASC']]
        })

        return NextResponse.json({ status: true, bloglist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}