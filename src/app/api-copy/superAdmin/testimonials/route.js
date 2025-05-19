import { extractErrorMessage } from "../../../../utils/errorMessage";
import { NextResponse } from "next/server";
import { testimonialModel } from "@/app/models/testimonials.model";
import { fileUploader } from "../../../../utils/fileUploader";
import { Op } from "sequelize";

export async function POST(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { description, name, designation } = JSON.parse(input.get('data'));
    const testimonialmodel = await testimonialModel();

    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        let image;
        if (file !== 'null') {
            image = await fileUploader(file);
        }

        await testimonialmodel.create({

            description, name, designation,image:image&&image
        })

       return NextResponse.json({ status: true, message: "testimonial created successfully!" });

} catch (error) {

    const message = extractErrorMessage(error);
    return NextResponse.json({ status: false, message });
}
}

export async function GET(request) {


    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));
    const testimonialmodel = await testimonialModel();
    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        const { rows, count } = await testimonialmodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{ name: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['createdAt', 'DESC']]

        })

        return NextResponse.json({ status: true, testimoniallist: rows, totalItems: count });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }

}


export async function DELETE(request) {

    const { testimonialId } = await request.json();
    const testimonialmodel = await testimonialModel();
    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }


    try {

        await testimonialmodel.destroy({ where: { testimonialId } });
        return NextResponse.json({ status: true, message: "deleted successfully" });

    } catch (error) {

        const message = extractErrorMessage(error);
        return NextResponse.json({ status: false, message });
    }
}

export async function PUT(request) {

    const input = await request.formData();
    const file = input.get('file');
    const { description, name, designation, testimonialId } = JSON.parse(input.get('data'));
    const testimonialmodel = await testimonialModel();

    if (!testimonialmodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        let image;
        if (file !== 'null') {
            image = await fileUploader(file);
        }
       
        await testimonialmodel.update({

            description,name,designation,image: image && image
        }, { where: { testimonialId } })

        return NextResponse.json({ status: true, message: "testimonial updated successfully!" });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}