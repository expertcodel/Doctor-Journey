"use server"
import { NextResponse } from "next/server";
import { fileUploader } from "../../../../utils/fileUploader";
import { UserModel } from "../../../models/user.model";
import { extractErrorMessage } from "../../../../utils/errorMessage";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
export async function PATCH(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { zip, city, description, address, facebook, instagram, twitter, pinterest, userId } = JSON.parse(input.get('data'));

    const usermodel = await UserModel();

    if (!usermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let Image;
        if (file !== 'null') {
            Image = await fileUploader(file);
        }

        await usermodel.update({
            zip, city, description, address, facebook, instagram, twitter, pinterest, profile_img: Image && Image

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