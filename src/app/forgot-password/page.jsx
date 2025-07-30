"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import Image from "next/image";
import Tooltip from "../../component/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
export default function ForgotPassword() {

  const { user } = useAuth();
  const router = useRouter();
  const [otpStatus, setOtpstatus] = useState({ sent: false, verified: false });
  const [message, setMessage] = useState({ success: "", failed: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileTimer, setMobileTimer] = useState(60);
  const [emailOtp, setEmailOtp] = useState(new Array(4).fill(""));
  const [mobileOtp, setMobileOtp] = useState(new Array(4).fill(""));
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const emailRefs = useRef([]);
  const mobileRefs = useRef([]);
  const hasRun = useRef(false);
  const [emailTimer, setEmailTimer] = useState(60);
  const [showEmailResend, setShowEmailResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMobileResend, setShowMobileResend] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const [otpPage, setOtppage] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountryValue, setSelectedCountryValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();
  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user]);


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


  const sendOtp = async (e) => {

    e.preventDefault();
    if (!validateInputs()) return;

    if (!recaptchaToken) {
      setMessage({failed:"Please complete the CAPTCHA",success:""});
      return;
    }


    setLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password`, { method: 'POST', body: JSON.stringify({ email: email.trim(), recaptchaToken }) })
    const res = await response.json();
    setLoading(false)
    if (res.status) {
      setEmailTimer(60);
      setOtpstatus({ sent: true, verified: false });
      setMessage({ success: res.message, failed: "" });
      setTimeout(() => {
        setMessage({ success: "", failed: "" });
      }, 3000);

    }
    else {
      setMessage({ success: "", failed: res.message });
    }

  }

  const handleResendEmailOtp = async () => {
    setEmailTimer(60);
    setShowEmailResend(false);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/otpCreate/regenerateOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'api_key': process.env.NEXT_PUBLIC_SECRET_KEY },
      body: JSON.stringify({ email: email, name: "" }),
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

    const payload = { email };

    if (/^\d{4}$/.test(emailOtpStr)) {
      payload.emailOtp = parseInt(emailOtpStr);
      isValid = true;
    } else if (emailOtp.some((d) => d !== "")) {
      setEmailError("Enter a valid 4-digit email OTP.");
    }



    if (!isValid) return;
    setLoading(true)
    const response = await fetch("/api/forget-password/otpVerify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: payload.emailOtp }),
    });

    const result = await response.json();
    setLoading(false)
    if (result.status) {

      setOtpstatus({ sent: true, verified: true })



    } else {

      setEmailError(result.message);

    }
  };

  const validateInputs = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!otpStatus.sent) {
      if (!email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email address";
        isValid = false;
      }
    }
    else if (otpStatus.sent && otpStatus.verified) {

      if (!password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords does not match";
        isValid = false;
      }

    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange1 = (field, value) => {

    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);


    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  // Validate format when the user leaves the field
  const handleBlur = (field) => {
    let newErrors = { ...errors };

    if (field === "email" && email.trim() && !emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (field === "password" && password.trim() && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (field === "confirmPassword" && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
  };

  const handleForgetpassword = async (e) => {

    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password/updatePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password.trim(), email: email.trim() }),
    });

    const res = await response.json();
    setLoading(false);
    if (res.status) {
      sessionStorage.setItem('successMsg', 'Password Updated Successfully');
      router.push('/login');
    }
    else {
      setMessage({ success: "", failed: res.message });
    }

  }

  return (
    <>
      {/*Breadcrumb*/}
      {
        message.success !== "" && <Tooltip message={message.success} />
      }
      <Breadcrumb title="Forgot Password" />

      {/*Login-Section*/}
      <section className="sptb loginSec otpScreen bg-white">
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
                  {!otpStatus.sent ? <div className="wrapper wrapper2">
                    <form id="login" className="card-body" tabIndex={500} onSubmit={sendOtp}>
                      <h3 className="pb-2">Forgot Password</h3>
                      <div className="mail">
                        <input type="text" id="email"
                          value={email}
                          onChange={(e) => handleInputChange1("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          autoComplete="off"
                          placeholder="Enter Email" />

                        {errors.email && <p className="text-danger text-start mt-2">{errors.email}</p>}
                      </div>
                      <div className="">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={(token) => setRecaptchaToken(token)}
                        />
                      </div>
                      <div className="submit">
                        <button className="btn btn-primary btn-block" type="submit">
                          {loading ? <div className="spinner-border text-white" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div> : 'Send'}

                        </button>
                        {
                          message.failed !== "" && <span style={{ color: 'red' }}>{message.failed}</span>
                        }
                      </div>

                      <div className="text-center text-dark mb-0">
                        Forget it, <Link href="/login">send me back</Link> to the sign in.
                      </div>
                    </form>
                  </div> : !otpStatus.verified ? <div className="wrapper wrapper2">
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
                        <a href="/" className="btn btn-info mt-2">
                          <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </a>
                      </p>
                    </form>
                  </div> :
                    <div className="wrapper wrapper2">


                      <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleForgetpassword}>
                        <h3 className="pb-2">Enter new password</h3>
                        <div className="passwd">
                          <input type={showPassword ? "text" : "password"} value={password}
                            id="password"
                            onChange={(e) => handleInputChange1("password", e.target.value)}
                            onBlur={() => handleBlur("password")}
                            autoComplete="new-password"
                            placeholder="Enter Password"
                          />
                          {
                            password && (
                              <span className="eyeIconPass"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                              </span>
                            )
                          }
                          <label>Password</label>
                          {errors.password && <p className="text-danger text-start mt-2">{errors.password}</p>}
                        </div>
                        <div className="passwd">
                          <input
                            type={showPasswordConfirm ? "text" : "password"}
                            value={confirmPassword}
                            id="confirmPassword"
                            onChange={(e) => handleInputChange1("confirmPassword", e.target.value)}
                            onBlur={() => handleBlur("confirmPassword")}
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                          />
                          {
                            confirmPassword && (
                              <span className="eyeIconPass"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                              >
                                {showPasswordConfirm ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                              </span>
                            )
                          }
                          <label>Confirm Password</label>
                          {errors.confirmPassword && <p className="text-danger text-start mt-2">{errors.confirmPassword}</p>}
                        </div>
                        <div className="submit">

                          <button className="btn btn-primary btn-block" type="submit">
                            {loading ? <div className="spinner-border text-white" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div> : 'Submit'}
                          </button>
                          {
                            message.failed !== "" && <div className="text-danger text-start mt-2">{message.failed}</div>
                          }

                        </div>

                      </form> </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/Login-Section*/}
    </>
  );
}
