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
  const { name, number, email, address, city, zip, country, amount, path, id, userId } = await req.json();

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
  const user = await UserModel();

  try {
    const order = await razorpay.orders.create(options);
    if (path === '/register-journal') {


      const isExistedemail = await user.findOne({ where: { email } })
      if (isExistedemail) {
        return Response.json({ message: "Email already exist!", status: false });
      }

      const isExistednumber = await user.findOne({ where: { email } })
      if (isExistednumber) {
        return Response.json({ message: "Mobile number already exist!", status: false });
      }

      await journals_registrationmodel.update({
        name, number, email, address, city, zip, country, registration_number: generate13DigitNumber(),
        userId: userId && userId
      }, { where: { id } })



      return Response.json({ order, id: id, status: true });
    }
    else {
      return Response.json(order);
    }

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Order creation failed", details: err.message }),
      { status: 500 }
    );
  }
}
