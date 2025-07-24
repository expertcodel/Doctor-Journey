"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Image from "next/image";

export default function OtpPage({ name, email }) {
    // const [email, setEmail] = useState("");
    const path = usePathname();
    const [phone, setPhone] = useState("");
    const [emailOtp, setEmailOtp] = useState(new Array(4).fill(""));
    const [mobileOtp, setMobileOtp] = useState(new Array(4).fill(""));
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const emailRefs = useRef([]);
    const mobileRefs = useRef([]);
    const router = useRouter();
    const [emailTimer, setEmailTimer] = useState(60);
    const [showEmailResend, setShowEmailResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobileTimer, setMobileTimer] = useState(60);
    const [showMobileResend, setShowMobileResend] = useState(false);
    const hasRun = useRef(false);

    useEffect(() => {

        const sendOtp = async () => {

            if (hasRun.current) return;
            hasRun.current = true;

            const data = { email: email, name: name };
            const option = {

                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/otpCreate/regenerateOtp`,
                data: data,
                headers: {

                    'api_key': process.env.NEXT_PUBLIC_SECRET_KEY,
                    'Content-Type': 'application/json'

                }

            }

            const res = await axios.request(option);
            if (!res.data.status) {
                setEmailError(res.data.message);
            }

        }

        if (path === '/login') {

            sendOtp();

        }


    }, [])


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
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/otpCreate/regenerateOtp`, {
            method: "POST",
            headers: { "Content-Type": "application/json", 'api_key': process.env.NEXT_PUBLIC_SECRET_KEY },
            body: JSON.stringify({ email: email, name: name }),
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
            if (filteredValue && index < 3) emailRefs.current[index + 1].focus();
        } else {
            const updated = [...mobileOtp];
            updated[index] = filteredValue;
            setMobileOtp(updated);
            if (filteredValue && index < 3) mobileRefs.current[index + 1].focus();
        }
    };

    const isOtpComplete = (arr) => arr.every((d) => d !== "");

    const handleVerify = async (e) => {
        e.preventDefault();

        const emailOtpStr = emailOtp.join("");
        // const phoneOtpStr = mobileOtp.join("");

        let isValid = false;
        setEmailError("");
        setMobileError("");

        const payload = { email, phone };

        if (/^\d{4}$/.test(emailOtpStr)) {
            payload.emailOtp = parseInt(emailOtpStr);
            isValid = true;
        } else if (emailOtp.some((d) => d !== "")) {
            setEmailError("Enter a valid 4-digit email OTP.");
        }



        // if (/^\d{6}$/.test(phoneOtpStr)) {
        //     payload.phoneOtp = phoneOtpStr;
        //     isValid = true;
        // } else if (mobileOtp.some((d) => d !== "")) {
        //     setMobileError("Enter a valid 6-digit mobile OTP.");
        // }

        if (!isValid) return;
        setLoading(true)
        const response = await fetch("/api/otpVerify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name, otp: payload.emailOtp, path }),
        });

        const result = await response.json();
        setLoading(false)
        if (result.status) {


            if (path === '/login') {

                if (result.url === '/user-dashboard') {
                    router.push(result.url);
                }
                else {
                    window.location.href = result.url
                }

            }
            else {
                sessionStorage.setItem('successMsg', 'User Profile Created Successfully');
                router.push('/login');
            }


        } else {
            // if (result.emailOtpValid === false) {
            setEmailError(result.message);
            // }

            // if (result.phoneOtpValid === false) {
            //     setMobileError("Invalid Mobile OTP. Please try again.");
            // }

            // Fallback if neither was verified
            // if (result.emailOtpValid !== false && result.phoneOtpValid !== false) {
            //     setEmailError("Invalid OTP. Please try again.");
            //     // setMobileError("Invalid OTP. Please try again.");
            // }
        }
    };

    return (
        <>
            {/*Breadcrumb*/}

            {/*Login-Section*/}
            <section className="sptb loginSec otpScreen">
                <div className="container customerpage">
                    <div className="card border-light-subtle shadow-sm">
                        <div className="row g-0">
                            <div className="col-12 col-md-6 pe-md-0">
                                <div className="leftSec text-bg-primary">
                                    <div className="d-flex align-items-center justify-content-center h-100">
                                        <div className="col-11 text-center py-3">
                                            <Image className="img-fluid rounded mb-4 d-block m-auto" loading="lazy" src="/images/login-process.png" width={300} height={300} alt="Login Process" />
                                            <hr className="border-primary-subtle mb-4" />
                                            <h3 className="h1 mb-4">
                                                We make digital products that drive you to stand out.
                                            </h3>
                                            <p className="lead m-0">
                                                We write words, take photos, make videos, and interact with artificial intelligence.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-12 ps-md-0">
                                <div className="rightSec single-page">
                                    <div className="wrapper wrapper2">
                                        <h4 className="otpMSZ">
                                            We have sent you the OTP on email: <span>{email || "—"}</span>
                                        </h4>
                                        <form autoComplete="off" noValidate className="card-body otpBody" tabIndex={500} onSubmit={handleVerify}>
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

                                            <div className="submit">

                                                <button className="btn btn-primary btn-block" type="submit" disabled={!isOtpComplete(emailOtp) || showEmailResend}>
                                                    {loading ? <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : 'Verify OTP'}
                                                </button>

                                            </div>
                                            <p className="text-dark mb-0">
                                                If you want to change your details <br />
                                                <a href="/register" className="btn btn-info mt-2">
                                                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                                                </a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
