import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { publisherModel } from "../../../models/publisher.model";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";
import { connectTodb } from "../../../../app/database/database";
import { UserModel } from "../../../models/user.model";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
export async function POST(request) {



    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { publisherName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, document, gstNumber, accountType, accountName, userId } = JSON.parse(input.get('data'));
    const publishermodel = await publisherModel();
    const usermodel = await UserModel();
    const connection = await connectTodb();

    if (!publishermodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {

        let profileimage;
        let degreedocumenturl;

        if (profileImage !== 'null' && profileImage !== 'undefined') {
            profileimage = await fileUploader(profileImage);
        }


        for (let i = 0; i < degreeDocument.length; i++) {
            if (degreeDocument[i] !== 'null' && degreeDocument[i] !== 'undefined') {
                degreedocumenturl = await fileUploader(degreeDocument[i]);
                document[i].documentFile = degreedocumenturl
            }
        }


        await connection.query(`
  UPDATE "Users"
  SET "usertype" = COALESCE("usertype", '[]'::jsonb) || to_jsonb(:type::text[])
  WHERE "userId" = :userId
`, {
            replacements: {
                userId,
                type: `{${["publisher"]}}`
            }
        });


        await publishermodel.create({
            publisherName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null, userId
        })

        const isValiduser = await usermodel.findOne({ where: { userId } });
        const token = jwt.sign({ userData: isValiduser }, process.env.AUTHENTICATION_KEY, { expiresIn: '1h' })
        await cookies().set('token', token, { httpOnly: true, maxAge: 3600, path: '/' });
        return NextResponse.json({ status: true, message: "publisher created successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        console.log(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function PUT(request) {
    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { publisherName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, publisherId, document, gstNumber, accountType, accountName } = JSON.parse(input.get('data'));
    const publishermodel = await publisherModel();
    if (!publishermodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }



    try {

        let profileimage;
        let degreedocumenturl;


        if (profileImage !== 'null' && profileImage !== 'undefined') {
            if (typeof (profileImage) === 'object') {

                profileimage = await fileUploader(profileImage);
            }
        }

        for (let i = 0; i < degreeDocument.length; i++) {
            if (degreeDocument[i] !== 'null' && degreeDocument[i] !== 'undefined') {
                if (typeof (degreeDocument[i]) === 'object') {
                    degreedocumenturl = await fileUploader(degreeDocument[i]);
                    document[i].documentFile = degreedocumenturl
                }

            }
        }



        await publishermodel.update({
            publisherName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null
        }, { where: { publisherId } })

        return NextResponse.json({ status: true, message: "publisher updated successfully!" });


    } catch (error) {


        const message = extractErrorMessage(error);
        console.log(message, "error");

        return NextResponse.json({ status: false, message });
    }
}

export async function DELETE(request) {

    const { publisherId } = await request.json();
    const publishermodel = await publisherModel();
    if (!publishermodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await publishermodel.destroy({
            where: { publisherId }
        })

        return NextResponse.json({ status: true, message: "publisher deleted successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = input.get('page');
    const publishermodel = await publisherModel();
    if (!publishermodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await publishermodel.findAndCountAll({

            where: { [Op.or]: { publisherName: { [Op.iLike]: `%${name}%` }, publisherId: { [Op.iLike]: `%${name}%` } } },
            limit: 10,
            offset: (page - 1) * 10,

            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, publisherlist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}