"use server"
import { blogModel } from "../../../../../app/models/blog.model";
// import { categoryModel } from '../../models/category.model'
import { NextResponse } from "next/server";
import { connectTodb } from "../../../../database/database";
const random = (total) => {

    return Math.floor((Math.random() * total + 1));
}

export async function POST(request) {

    const { blogUrl } = await request.json();
    const blogmodel = await blogModel();
     const connection = await connectTodb();
    if (!blogmodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const blogdetail = await blogmodel.findOne({
            where: { blogUrl }
        })
       
        const categorylist = await connection.query(`SELECT * FROM public."Categories"`)
        const {count}=blogmodel.findAndCountAll();
        const bloglist = await blogmodel.findAll({
            offset: count > 3 ? random(count - 3) : 0, order: [['created_at', 'DESC']], limit: 3, attributes: ['blogId', 'blogImage', 'publishedDate', 'blogTitle', 'blogUrl'], order: [['blogSerial', 'DESC']],
            where: { blogStatus: true }
        });

       

        return NextResponse.json({ status: true, blogdetail, bloglist, categorylist:categorylist[0]});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}