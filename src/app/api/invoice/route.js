import { invoiceModel } from "../../models/invoice.model";
import { NextResponse } from "next/server";



const random=()=>{

    return Math.floor(Math.random()*1000+9000);
}


export async function POST(request) {
   
    const { customerName,email,buyerId,sellerId,itemDetails } = await request.json();
    const invoicemodel = await invoiceModel();
    

    if (!invoicemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    try {

        await invoicemodel.create({


            invoiceNumber: `INV${new Date().getFullYear()}${new Date().getMonth()}${random()}`,
            customerName,email,buyerId,sellerId,itemDetails
            // customerName,
            // email,
            // buyerId: "",
            // sellerId: "",
            // itemDetails: {

            //     billingaddress: {

            //         FullName: "",
            //         Address: "",
            //         MobileNumber: "",
            //         GstNumber: ""

            //     },
            //     shippingaddress: {

            //         FullName: "",
            //         Address: "",
            //         MobileNumber: "",
            //         GstNumber: ""

            //     },
            //     price: "",
            //     gst: "",
            //     totalPrice: ""
            }

            
    )

    return NextResponse.json({ status: true, message: "invoice created successfully!" });

    } catch (error) {


        console.log(error);
        return NextResponse.json({ status: true, message: "some error occured!" });

    }
}


export async function GET()
{
    const invoicemodel=await invoiceModel();
    if(!invoicemodel)
    {
        return NextResponse.json({status:false,message:'database error occured!'});
    }

    try {

        const invoiceList=await invoicemodel.findAll();
        return NextResponse.json({status:true,invoiceList});
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({status:false,message:'some error occured!'});
    }

}