"use server"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { UserModel } from "../../../models/user.model";

export async function POST(request) {

    const { email,password } = await request.json();
    const usermodel = await UserModel();
    const isExisteduser = await usermodel.findOne({ where: { email } });
    if (!isExisteduser) {
        return NextResponse.json({ status: 0, message: "This email id not exist!" });
    }
   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await usermodel.update({
     password: hashedPassword,
      
    },{where:{userId:isExisteduser.userId}})

    return NextResponse.json({ status: 1, message: "Password updated successfully!" });


}