import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { authorModel } from "../../../models/author.model";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";
export async function POST(request) {

    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { authorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, document, gstNumber, accountType, accountName } = JSON.parse(input.get('data'));
    const authormodel = await authorModel();
    if (!authormodel) {
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

        await authormodel.create({
            authorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null
        })

        return NextResponse.json({ status: true, message: "author created successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function PUT(request) {
    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { authorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, authorId, document, gstNumber, accountType, accountName } = JSON.parse(input.get('data'));
    const authormodel = await authorModel();
    if (!authormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    const isExistauthor=await authormodel.findOne({where:{email}});
    if(isExistauthor)
    {
        return NextResponse.json({ status: true, message: "author existed already!" });
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



        await authormodel.update({
            authorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip,  branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null
        }, { where: { authorId } })

        return NextResponse.json({ status: true, message: "author updated successfully!" });


    } catch (error) {


        const message = extractErrorMessage(error);
        console.log(message,"error");
        
        return NextResponse.json({ status: false, message });
    }
}

export async function DELETE(request) {

    const { authorId } = await request.json();
    const authormodel = await authorModel();
    if (!authormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await authormodel.destroy({
            where: { authorId }
        })

        return NextResponse.json({ status: true, message: "author deleted successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const id = input.get('id');
    const page = input.get('page');
    const authormodel = await authorModel();
    if (!authormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await authormodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: { [Op.or]: { authorName: { [Op.iLike]: `%${name}%` }, authorId: { [Op.iLike]: `%${id}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, authorlist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}