import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";

export async function POST(request) {

    const { journalsName, journalsIsbn, publisherName, rights,frequency } = await request.json();
    const journalsmodel = await journalsModel();
    if (!journalsmodel) {
        return NextResponse.json({ status: false, message: 'database error' });
    }


    try {


        await journalsmodel.create({

            journalsName,
            journalsIsbn,
            publisherName,
            rights,
            frequency

        })

        return NextResponse.json({ status: true, message: 'Journals created successfully' });

    } catch (error) {

        return NextResponse.json({ status: false, message: 'some error occured' });

    }



}

export async function GET() {

    const journal = await journalsModel();
    if (!journal) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const journals = await journal.findAll({order:[['id','ASC']]});
    return NextResponse.json({ status: true,journals});

}