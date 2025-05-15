"use client";
import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function VerifyOtp() {
    const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
    const [mobileOtp, setMobileOtp] = useState(new Array(6).fill(""));
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const emailRefs = useRef([]);
    const mobileRefs = useRef([]);
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const router = useRouter();

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
      
        let hasError = false;
      
        if (emailOtpStr.length === 6 && !/^\d{6}$/.test(emailOtpStr)) {
          setEmailError("Enter a valid 6-digit email OTP.");
          hasError = true;
        } else {
          setEmailError("");
        }
      
        if (phoneOtpStr.length === 6 && !/^\d{6}$/.test(phoneOtpStr)) {
          setMobileError("Enter a valid 6-digit mobile OTP.");
          hasError = true;
        } else {
          setMobileError("");
        }
      
        // Require at least one OTP to proceed
        if (!/^\d{6}$/.test(emailOtpStr) && !/^\d{6}$/.test(phoneOtpStr)) {
          setEmailError("Enter at least one valid 6-digit OTP.");
          setMobileError("Enter at least one valid 6-digit OTP.");
          return;
        }
      
        if (hasError) return;
      
        const response = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            phone,
            emailOtp: emailOtpStr,
            phoneOtp: phoneOtpStr,
          }),
        });
      
        const result = await response.json();
        if (result.success) {
          router.push("/user-dashboard");
        } else {
          setEmailError("Invalid OTP. Please try again.");
          setMobileError("Invalid OTP. Please try again.");
        }
    };

    return (
        <>
            {/*Breadcrumb*/}
            <section>
            <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                <div className="header-text mb-0">
                    <div className="container">
                        <div className="text-center text-white">
                            <h1 className="">Register</h1>
                            <ol className="breadcrumb text-center">
                                <li className="breadcrumb-item">
                                    <Link href="/register">Register</Link>
                                </li>
                                <li className="breadcrumb-item active text-white" aria-current="page">
                                    OTP
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            {/*Breadcrumb*/}

            {/*Login-Section*/}
            <section className="sptb loginSec">
                <div className="container customerpage">
                    <div className="row">
                        <div className="single-page">
                            <div className="col-md-4 d-block mx-auto">
                                <div className="wrapper wrapper2 border">
                                    <form autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleVerify}>
                                        <div className="country">
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
                                            <label>Enter Email OTP</label>
                                            {emailError && <p className="text-danger text-start mt-2">{emailError}</p>}
                                        </div>
                                        <div className="country">
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
                                            <label>Enter Mobile OTP</label>
                                            {mobileError && <p className="text-danger text-start mt-2">{mobileError}</p>}
                                        </div>
                                        <div className="submit">
                                            <button 
                                                className="btn btn-primary btn-block" 
                                                type="submit"
                                                disabled={!isOtpComplete(emailOtp) && !isOtpComplete(mobileOtp)}
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
