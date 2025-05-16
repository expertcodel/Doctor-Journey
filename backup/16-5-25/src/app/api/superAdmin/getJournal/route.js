import { NextResponse } from "next/server";
import { journalsModel } from "../../../models/journals.model";

export async function GET() {

    const journal = await journalsModel();
    if (!journal) {
        return NextResponse.json({ status: false, message: "some error occured" });
    }

    const journals = await journal.findAll({where:{journalStatus:'approved'},order:[['id','ASC']]});
    return NextResponse.json({ status: true,journals});

}