import { journal_registrationModel } from "../../../models/journal_subscription.model";
import { NextResponse } from "next/server";
import { extractErrorMessage } from '../../../../utils/errorMessage';
export async function POST(req) {
  const { amount, plans, journal_id, journal_name, volume } = await req.json();


  const journals_registrationmodel = await journal_registrationModel();

  try {


    const response=await journals_registrationmodel.create({
      volume, amount, plans, journal_id, journal_name
    })


    return NextResponse.json({message:"registered successfully",id:response.id,status: true });


  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false, message:"some error occured!" });
  }
}
