import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { offerModel } from "../../../../app/models/offer.model";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";

export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { offerContent, offerDiscount } = JSON.parse(input.get('data'));
    const offermodel = await offerModel();

    if (!offermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        let image;
        if (file !== 'null') {
            image = await fileUploader(file);
        }

        await offermodel.create({

            offerContent, offerDiscount, offerImage: image && image
        })

        return NextResponse.json({ status: true, message: "offer created successfully!" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const offermodel = await offerModel();
    if (!offermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const { rows, count } = await offermodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            attributes:['offerId','offerImage','offerDiscount','status'],
            // where: {

            //     [Op.or]: [{ offerDiscount: { [Op.iLike]: `%${name}%` } }]
            // },
            order: [['createdAt', 'DESC']]

        })

        return NextResponse.json({ status: true, offerlist: rows, totalItems: count });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}


export async function DELETE(request) {

    const { offerId } = await request.json();
    const offermodel = await offerModel();
    if (!offermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await offermodel.destroy({ where: { offerId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { offerContent, status, offerId, offerDiscount } = JSON.parse(input.get('data'));
    const offermodel = await offerModel();

    if (!offermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let image;
        if (file !== 'null') {
            image = await fileUploader(file);
        }

        await offermodel.update({

            offerContent, offerDiscount, offerImage: image && image, status
        }, { where: { offerId } })

        return NextResponse.json({ status: true, message: "offer updated successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}