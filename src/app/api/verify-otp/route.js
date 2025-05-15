export async function POST(req) {
    const { emailOtp, phoneOtp } = await req.json();
  
    const expectedOtp = "123456"; // Simulated OTP
  
    const emailOtpValid = emailOtp ? emailOtp === expectedOtp : undefined;
    const phoneOtpValid = phoneOtp ? phoneOtp === expectedOtp : undefined;
  
    const success =
      (emailOtpValid === true || phoneOtpValid === true);
  
    return Response.json({
      success,
      emailOtpValid,
      phoneOtpValid,
    });
}
  