import { NextResponse } from "next/server";
import { doctorModel } from "../../../../models/doctor.model";
import { fileUploader } from '../../../../../utils/fileUploader'
import { connectTodb } from "../../../../database/database";
import path from 'path'
import fs from 'fs'
import { Op } from "sequelize";

export async function POST(request) {
    const input = await request.formData();
    const file = input.getAll('file');
    const { doctorId } = JSON.parse(input.get('data'));
    const doctormodel = await connectTodb();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "some error occured!" });
    }


    try {

        let imageUrl = [];
        for (let i = 0; i < file.length; i++) {
            const url = await fileUploader(file[i])
            imageUrl.push(url);
        }

        const formattedArray = `{${imageUrl.map(url => `"${url}"`).join(',')}}`;


        await doctormodel.query(`
  UPDATE "Doctors"
  SET "gallery" = COALESCE("gallery", '[]'::jsonb) || to_jsonb(:newUrl::text[])
  WHERE "doctorId" = :doctorId
`, {
            replacements: {
                doctorId,
                newUrl: formattedArray
            }
        });

       
        return NextResponse.json({ status: true, message: "image uploaded successfully!" });


    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

}