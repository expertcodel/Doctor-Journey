"use server"
import { NextResponse } from "next/server";
import { fileUploader } from "../../../../utils/fileUploader";
import { UserModel } from "../../../models/user.model";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { connectTodb } from '../../../database/database'
export async function PATCH(request) {

    const input = await request.formData();

    const file = input.get('file');
    const { zip, city, description, address, facebook, instagram, twitter, linkedin, userId, country, department_id } = JSON.parse(input.get('data'));

    const usermodel = await UserModel();
    const connection = await connectTodb();
    if (!usermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let Image;
        if (file !== 'null') {
            Image = await fileUploader(file);
        }

        const id = await connection.query(`SELECT * FROM public."Departments" WHERE public."Departments"."departmentName"='${department_id}'`)
       
        await usermodel.update({
            zip, city, description, address, facebook, instagram, twitter, linkedin, profile_img: Image && Image,
            country, department_id: id[0][0].id
        }, { where: { userId } })
        const isValiduser = await usermodel.findOne({ where: { userId } });
        const token = jwt.sign({ userData: isValiduser }, process.env.AUTHENTICATION_KEY, { expiresIn: '1h' })
        await cookies().set('token', token, { httpOnly: true, maxAge: 3600, path: '/' });
        return NextResponse.json({ status: 1, message: "Profile updated successfully!" });

    } catch (error) {

        console.log(error);
        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });

    }

}