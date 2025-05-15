"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/app/component/Breadcrumb";

export default function VerifyOtp() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
    const [mobileOtp, setMobileOtp] = useState(new Array(6).fill(""));
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const emailRefs = useRef([]);
    const mobileRefs = useRef([]);
    const router = useRouter();
    const [emailTimer, setEmailTimer] = useState(60);
    const [showEmailResend, setShowEmailResend] = useState(false);

    const [mobileTimer, setMobileTimer] = useState(60);
    const [showMobileResend, setShowMobileResend] = useState(false);

    // Load email and phone from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("tempEmail");
        const storedPhone = localStorage.getItem("tempPhone");

        setEmail(storedEmail || "");
        setPhone(storedPhone || "");
    }, []);

    useEffect(() => {
        let interval = null;
        if (emailTimer > 0) {
          interval = setInterval(() => {
            setEmailTimer((prev) => prev - 1);
          }, 1000);
        } else {
          setShowEmailResend(true);
        }
        return () => clearInterval(interval);
    }, [emailTimer]);
    useEffect(() => {
        let interval = null;
        if (mobileTimer > 0) {
          interval = setInterval(() => {
            setMobileTimer((prev) => prev - 1);
          }, 1000);
        } else {
          setShowMobileResend(true);
        }
        return () => clearInterval(interval);
    }, [mobileTimer]);
    const handleResendEmailOtp = async () => {
        setEmailTimer(60);
        setShowEmailResend(false);
        await fetch("/api/resend-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "email", email }),
        });
    };
      
    const handleResendMobileOtp = async () => {
        setMobileTimer(60);
        setShowMobileResend(false);
        await fetch("/api/resend-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "mobile", phone }),
        });
    };

    const handleInputChange = (type, index, value) => {
        const filteredValue = value.replace(/\D/g, "");
        if (type === "email") {
            const updated = [...emailOtp];
            updated[index] = filteredValue;
            setEmailOtp(updated);
            if (filteredValue && index < 5) emailRefs.current[index + 1].focus();
        } else {
            const updated = [...mobileOtp];
            updated[index] = filteredValue;
            setMobileOtp(updated);
            if (filteredValue && index < 5) mobileRefs.current[index + 1].focus();
        }
    };

    const isOtpComplete = (arr) => arr.every((d) => d !== "");

    const handleVerify = async (e) => {
        e.preventDefault();
      
        const emailOtpStr = emailOtp.join("");
        const phoneOtpStr = mobileOtp.join("");
      
        let isValid = false;
        setEmailError("");
        setMobileError("");
      
        const payload = { email, phone };
      
        if (/^\d{6}$/.test(emailOtpStr)) {
          payload.emailOtp = emailOtpStr;
          isValid = true;
        } else if (emailOtp.some((d) => d !== "")) {
          setEmailError("Enter a valid 6-digit email OTP.");
        }
      
        if (/^\d{6}$/.test(phoneOtpStr)) {
          payload.phoneOtp = phoneOtpStr;
          isValid = true;
        } else if (mobileOtp.some((d) => d !== "")) {
          setMobileError("Enter a valid 6-digit mobile OTP.");
        }
      
        if (!isValid) return;
      
        const response = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      
        const result = await response.json();
      
        if (result.success) {
          router.push("/user-dashboard");
        } else {
          if (result.emailOtpValid === false) {
            setEmailError("Invalid Email OTP. Please try again.");
          }
      
          if (result.phoneOtpValid === false) {
            setMobileError("Invalid Mobile OTP. Please try again.");
          }
      
          // Fallback if neither was verified
          if (result.emailOtpValid !== false && result.phoneOtpValid !== false) {
            setEmailError("Invalid OTP. Please try again.");
            setMobileError("Invalid OTP. Please try again.");
          }
        }
    };

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Verify OTP" />

            {/*Login-Section*/}
            <section className="sptb loginSec otpScreen">
                <div className="container customerpage">
                    <div className="row">
                        <div className="single-page">
                            <div className="col-md-4 d-block mx-auto">
                                <div className="wrapper wrapper2 border">
                                    <h4 class="otpMSZ">
                                        We have sent you the OTP on email: <span>{email || "—"}</span> and phone no.: <span>{phone || "—"}</span>
                                    </h4>
                                    <form autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleVerify}>
                                        <div className="country">
                                            <label>
                                                Enter Email OTP
                                                {
                                                    !showEmailResend ? (
                                                        <span>{`0:${emailTimer.toString().padStart(2, "0")}`}</span>
                                                    ) : (
                                                        <span
                                                            className="resendBtn"
                                                            onClick={handleResendEmailOtp}
                                                        >
                                                            Resend OTP
                                                        </span>
                                                    )
                                                }
                                            </label>
                                            <div className="d-flex gap-2 mb-3">
                                                {emailOtp.map((digit, i) => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    maxLength={1}
                                                    className="otp-box"
                                                    value={digit}
                                                    ref={(el) => (emailRefs.current[i] = el)}
                                                    onChange={(e) => handleInputChange("email", i, e.target.value)}
                                                    onKeyDown={(e) => {
                                                    if (e.key === "Backspace" && !digit && i > 0) {
                                                        emailRefs.current[i - 1].focus();
                                                    }
                                                    }}
                                                />
                                                ))}
                                            </div>
                                            {emailError && <p className="text-danger text-start mt-2">{emailError}</p>}
                                        </div>
                                        <div className="country">
                                            <label>
                                                Enter Mobile OTP
                                                {
                                                    !showMobileResend ? (
                                                        <span>{`0:${mobileTimer.toString().padStart(2, "0")}`}</span>
                                                    ) : (
                                                        <span
                                                            className="resendBtn"
                                                            onClick={handleResendMobileOtp}
                                                        >
                                                            Resend OTP
                                                        </span>
                                                    )
                                                }
                                            </label>
                                            <div className="d-flex gap-2">
                                                {mobileOtp.map((digit, i) => (
                                                <input
                                                    key={i}
                                                    type="text"
                                                    maxLength={1}
                                                    className="otp-box"
                                                    value={digit}
                                                    ref={(el) => (mobileRefs.current[i] = el)}
                                                    onChange={(e) => handleInputChange("mobile", i, e.target.value)}
                                                    onKeyDown={(e) => {
                                                    if (e.key === "Backspace" && !digit && i > 0) {
                                                        mobileRefs.current[i - 1].focus();
                                                    }
                                                    }}
                                                />
                                                ))}
                                            </div>
                                            {mobileError && <p className="text-danger text-start mt-2">{mobileError}</p>}
                                        </div>
                                        <div className="submit">
                                            <button 
                                                className="btn btn-primary btn-block" 
                                                type="submit"
                                                disabled={!isOtpComplete(emailOtp) || !isOtpComplete(mobileOtp)}
                                            >
                                                Verify OTP
                                            </button>
                                        </div>
                                        <p className="text-dark mb-0">
                                            If you want to change your details <br />
                                            <Link href="/register" className="btn btn-info mt-2">
                                                <FontAwesomeIcon icon={faArrowLeft} /> Back
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
