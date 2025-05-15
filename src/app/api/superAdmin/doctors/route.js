import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { doctorModel } from "../../../models/doctor.model";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";
export async function POST(request) {

    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, document, gstNumber, accountType, accountName } = JSON.parse(input.get('data'));
    const doctormodel = await doctorModel();
    if (!doctormodel) {
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





        await doctormodel.create({
            doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null
        })

        return NextResponse.json({ status: true, message: "Doctor created successfully!" });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function PUT(request) {
    const input = await request.formData();
    const profileImage = input.get('profileImage');
    const degreeDocument = input.getAll('documentImage');

    const { doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName, doctorId, document, gstNumber, accountType, accountName } = JSON.parse(input.get('data'));
    const doctormodel = await doctorModel();
    if (!doctormodel) {
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



        await doctormodel.update({
            doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip,  branchAddress, branchName, bankName, ifsc, accountNumber, license, identityName,
            profileImage: profileimage && profileimage, document, gstNumber, accountType, accountName,
            location: (location[0].latitude && location[0].longitude) ? location : null
        }, { where: { doctorId } })

        return NextResponse.json({ status: true, message: "Doctor updated successfully!" });


    } catch (error) {


        const message = extractErrorMessage(error);
        console.log(message,"error");
        
        return NextResponse.json({ status: false, message });
    }
}

export async function DELETE(request) {

    const { doctorId } = await request.json();
    const doctormodel = await doctorModel();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        await doctormodel.destroy({
            where: { doctorId }
        })

        return NextResponse.json({ status: true, message: "Doctor deleted successfully!" });


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
    const doctormodel = await doctorModel();
    if (!doctormodel) {
        return NextResponse.json({ status: false, message: "database error occured" });
    }

    try {


        const { rows, count } = await doctormodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: { [Op.or]: { doctorName: { [Op.iLike]: `%${name}%` }, doctorId: { [Op.iLike]: `%${id}%` } } },
            order: [['createdAt', 'DESC']]
        })

        return NextResponse.json({ status: true, doctorlist: rows, totalItems: count });


    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}