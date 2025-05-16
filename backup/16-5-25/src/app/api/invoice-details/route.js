import { NextResponse } from "next/server";
import {invoiceModel} from '../../models/invoice.model'

export async function POST(request)
{

    const {buyerId}=await request.json();
    const invoicemodel=await invoiceModel();
    if(!invoicemodel)
    {
        return NextResponse.json({status:false,message:"database error occured"});
    }
   
    try {

        const invoice=await invoicemodel.findOne({where:{buyerId}});
        return NextResponse.json({status:true,invoice});
        
    } catch (error) {

        console.log(error);
        return NextResponse.json({status:false,message:"some error occured"});
        
    }

}




// {
//     "customerName":"rohit",
//     "email":"r8383922084@gmail.com",
//     "buyerId": "72626782",
//     "sellerId": "9188928",
//     "itemDetails": {
                    
//                      "journaldetails":
//                      [
//                           {
//                              "JournalName":"journals mind",
//                            "Price":"3526"
//                             },
//                          {
//                              "JournalName":"journals mind2",
//                            "Price":"352"
//                             }
                          
//                      ],
//        "billingaddress": {

//             "FullName": "rohit jaiswal",
//             "Address": "Mukandpur, Delhi",
//             "MobileNumber": "8383922084",
//             "GstNumber": "GST5266IN"

//         },
//         "shippingaddress": {

//             "FullName": "rohit jaiswal",
//             "Address": "Mukandpur, Delhi",
//             "MobileNumber": "8383922084",
//             "GstNumber": "GST5266IN"

//         },
//         "price": "4567",
//         "gst": "22.34",
//         "totalPrice": "4589.34"
//     }
// }