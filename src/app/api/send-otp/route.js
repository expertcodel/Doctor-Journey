export async function POST(req) {
    const { email, phoneNumber } = await req.json();

    // Simulate OTP send (in real life, use SendGrid, Twilio, etc.)
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in memory/database (temporary session)
    // Example: store in Redis, DB, or encrypted cookie

    console.log(`Sending OTP ${generatedOTP} to ${email} and ${phoneNumber}`);

    return Response.json({ success: true });
}
