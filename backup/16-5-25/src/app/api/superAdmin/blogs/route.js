import { blogModel } from "@/app/models/blog.model";
import { NextResponse } from "next/server";
import { fileUploader } from "@/utils/fileUploader";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { Op } from "sequelize";
export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { blogTitle, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl } = JSON.parse(input.get('data'));
    const blogmodel = await blogModel();

    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const isExistblog = await blogmodel.findOne({ where: { blogUrl } });
    if (isExistblog) {
        return NextResponse.json({ status: false, message: "Choose different url!" });
    }

    try {

        let blogImage;
        if (file !== 'null') {
            blogImage = await fileUploader(file);
        }



        await blogmodel.create({
            blogTitle, blogImage: blogImage && blogImage, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl
        })

        return NextResponse.json({ status: true, message: "blog created successfully!" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });

    }



}


export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { blogId,blogTitle, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl,blogStatus } = JSON.parse(input.get('data'));
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
            blogTitle,blogImage:blogImage && blogImage, blogDescription, blogContent, metaDescriptions, metaKeywords, metaTitle, blogSerial, blogUrl,blogStatus
        },{where:{blogId}})

        return NextResponse.json({ status: true, message: "blog updated successfully!" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });

    }



}


export async function DELETE(request) {
    
    const {blogId} = await request.json();
    const blogmodel = await blogModel();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       
        await blogmodel.destroy({
           where:{blogId}
        })

        return NextResponse.json({ status: true, message: "blog deleted successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {
    
    const input = new URL(request.url).searchParams;
    const name= input.get('name');
    //const id= input.get('id');
    const page= input.get('page');
    const blogmodel = await blogModel();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

       
        const {rows,count}=await blogmodel.findAndCountAll({
        
           limit:10,
           offset:(page-1)*10,
           where:{[Op.or]:{blogTitle:{[Op.iLike]:`%${name}%`},blogId:{[Op.iLike]:`%${name}%`}}},
           order:[['createdAt','DESC']]
        })

        return NextResponse.json({status:true,bloglist:rows,totalItems:count});


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}