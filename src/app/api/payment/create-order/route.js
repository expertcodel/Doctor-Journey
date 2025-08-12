// app/api/payment/create-order/route.js
import Razorpay from "razorpay";
import { journal_registrationModel } from "../../../models/journal_subscription.model";
import { UserModel } from "../../../models/user.model";
function generate13DigitNumber() {
  const min = 1e12; // 1000000000000
  const max = 9.999999999999e12; // Just under 10 trillion
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export async function POST(req) {
  const { name, number, email, address, city, zip, country, amount, path, id } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const journals_registrationmodel = await journal_registrationModel();
 

  try {

    const order = await razorpay.orders.create(options);
    if (path === '/register-journal') {

     
      await journals_registrationmodel.update({
        name, number, email, address, city, zip, country, registration_number: generate13DigitNumber()
      }, { where: { id } })

      return Response.json({ order, id: id, status: true });
    }
    else {
      return Response.json(order);
    }

  } catch (err) {
    console.log(err, 'error');

    return new Response(
      JSON.stringify({ error: "Order creation failed", details: err.message }),
      { status: 500 }
    );
  }
}
