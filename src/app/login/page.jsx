"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import Tooltip from "../../component/Tooltip";
import OtpPage from "../component/OtpPage";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Login() {
  //const { user, login } = useAuth();
  const router = useRouter();
  // Local state for email and password
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [Message, setmessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")
  const [otpPage, setOtppage] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef();


  useEffect(() => {


    if (Message !== "") {
      const timer = setTimeout(() => {
        setmessage("");
        sessionStorage.removeItem('successMsg');
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [])


  // Function to validate email

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Function to validate inputs
  const validateInputs = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop execution if validation fails

    // if (!recaptchaToken) {
    //   setMessage("Please complete the CAPTCHA");
    //   return;
    // }


    // document.cookie = `authToken=${fakeToken}; path=/; max-age=86400;`; // Store token in cookie

    setLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, { method: 'POST', body: JSON.stringify({ email: email.trim(), password: password.trim(), recaptchaToken }), headers: { "Content-Type": "application/json" } })

    const res = await response.json();
    setLoading(false);
    if (res.status) {

      if (res.url === '/dashboard') {
        window.location.href = res.url;
      }
      else {
        router.push(res.url);
      }

    }
    else {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }

      if (res.message === 'Email not verified!') {
        setOtppage(true);
        setName(res.name);
      }
      else {
        setMessage(res.message);
      }
    }


  };

  const handleInputChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
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
    setErrors(newErrors);
  };

  return (
    <>
      {/*Breadcrumb*/}
      {

        Message !== "" && <Tooltip message={Message} />
      }
      <Breadcrumb title={otpPage ? "Verify OTP" : "Login"} />

      {/*Login-Section*/}
      {!otpPage ? <section className="sptb loginSec bg-white">
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
                    <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleLogin}>
                      <h3 className="pb-2">Login</h3>
                      <div className="mail">
                        <input type="text" value={email}
                          id="email"
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          autoComplete="off"
                        />
                        <label>Email Id</label>
                        {errors.email && <p className="text-danger text-start mt-2">{errors.email}</p>}
                      </div>
                      <div className="passwd">
                        <input type={showPassword ? "text" : "password"} value={password}
                          id="password"
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          onBlur={() => handleBlur("password")}
                          autoComplete="new-password"
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
                          </div> : 'Login'}
                        </button>
                        {
                          message !== "" && <div className="text-danger text-start mt-2">{message}</div>
                        }
                      </div>
                      <p className="mb-2">
                        <Link href="/forgot-password">Forgot Password</Link>
                      </p>
                      <p className="text-dark mb-0">
                        Don't have account?
                        <Link href="/register" className="text-primary ms-1">
                          Register
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> : <OtpPage name={name} email={email.trim()} />}
      {/*/Login-Section*/}
    </>
  );
}
