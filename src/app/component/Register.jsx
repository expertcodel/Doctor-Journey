"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import axios from "axios";
import OtpPage from '../component/OtpPage';
import Select2Component from "../component/Select2Component";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
export default function Register({ countryList }) {
    const { user, login } = useAuth();
    const router = useRouter();
    // Local state for email and password
    const [Message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountrycode] = useState("");
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
            router.push("/user-dashboard"); // Redirect logged-in users
        }
    }, [user, router]);

    useEffect(() => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("phoneNumber").value = "";
        // document.getElementById("country").value = "";
        document.getElementById("confirmPassword").value = "";
    }, []);

    // Function to validate inputs
    const validateInputs = () => {
        let newErrors = { email: "", password: "", name: "" };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (!nameRegex.test(name)) {
            newErrors.name = "Enter a valid name";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(email)) {
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

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }


        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
            isValid = false;
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be at least 10 characters";
            isValid = false;
        }

        if (!selectedCountryValue) {
            newErrors.country = "Country is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return; // Stop execution if validation fails
        if (!recaptchaToken) {
            setMessage("Please complete the CAPTCHA");
            return;
        }


        try {
            const data = { name: name.trim().toLowerCase(), email: email.trim().toLowerCase(), password: password.trim(), number: phoneNumber.trim(), country, countryCode }

            const option = {

                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/otpCreate`,
                data: data,
                headers: {

                    'api_key': process.env.NEXT_PUBLIC_SECRET_KEY,
                    'Content-Type': 'application/json'

                },
                validateStatus: () => true

            }
            setLoading(true)
            const res = await axios.request(option)
            setLoading(false);
            if (res.data.status === 1) {
                setMessage("");
                // sessionStorage.setItem('data', JSON.stringify(data));
                // sessionStorage.setItem('successMsg', 'User Profile Created Successfully');
                //  router.push('/verify-otp');
                setOtppage(true);

            }
            else {
                
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                    setRecaptchaToken(null);
                }
                setMessage(res.data.message);

            }



        } catch (error) {
            // console.error("Error sending OTP:", error);
            console.error("Error sending OTP:", error?.response?.data || error.message);
        }
    };

    const
        handleInputChange = (field, value) => {
            if (field === "name") setName(value);
            if (field === "email") setEmail(value);
            if (field === "password") setPassword(value);
            if (field === "phoneNumber") setPhoneNumber(value);
            if (field === "confirmPassword") setConfirmPassword(value);
            // console.log(JSON.parse(value).country,"count");

            if (field === "country") {
                setSelectedCountryValue(value);
                setCountry(JSON.parse(value).country);
                setCountrycode(JSON.parse(value).countryCode);
            }
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        };

    // Validate format when the user leaves the field
    const handleBlur = (field) => {
        let newErrors = { ...errors };
        if (field === "name" && name.trim() && !nameRegex.test(name)) {
            newErrors.name = "Enter a valid name";
        }
        if (field === "name" && name.trim() && name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        if (field === "email" && email.trim() && !emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (field === "password" && password.trim() && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (field === "phoneNumber" && phoneNumber.trim() && !phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be at least 10 characters";
        }
        if (field === "confirmPassword" && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
    };


    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title={otpPage ? "Verify OTP" : "Register"} />

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
                                        <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleRegister}>
                                            <h3 className="pb-2">Register</h3>
                                            <div className="mail">
                                                <input type="text" value={name}
                                                    id="name"
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    onBlur={() => handleBlur("name")}
                                                    autoComplete="off"
                                                    placeholder="Enter Name"
                                                />
                                                <label>Full name</label>
                                                {errors.name && <p className="text-danger text-start mt-2">{errors.name}</p>}
                                            </div>
                                            <div className="mail">
                                                <input type="text" value={email}
                                                    id="email"
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    onBlur={() => handleBlur("email")}
                                                    autoComplete="off"
                                                    placeholder="Enter Email"
                                                />
                                                <label>Email Id</label>
                                                {errors.email && <p className="text-danger text-start mt-2">{errors.email}</p>}
                                            </div>
                                            <div className="passwd">
                                                <input type={showPassword ? "text" :"password"} value={password}
                                                    id="password"
                                                    onChange={(e) => handleInputChange("password", e.target.value)}
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
                                                    type={showPasswordConfirm ? "text" :"password"}
                                                    value={confirmPassword}
                                                    id="confirmPassword"
                                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
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

                                            <div className="country">
                                                <label>Country</label>
                                                <Select2Component
                                                    id="country"
                                                    value={selectedCountryValue} // ✅ controlled value
                                                    options={countryList.map((item) => ({
                                                        value: JSON.stringify({ country: item.name, countryCode: item.phonecode }),
                                                        label: item.name,
                                                    }))}
                                                    select2Options={{ placeholder: "Select Country", allowClear: true }}
                                                    showSearch={true}
                                                    onChange={(value) => {
                                                        if (value) {
                                                        const parsed = JSON.parse(value);
                                                        setSelectedCountryValue(value); // ✅ save the full string
                                                        setCountry(parsed.country);
                                                        setCountrycode(parsed.countryCode);
                                                        setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
                                                        } else {
                                                        setSelectedCountryValue("");
                                                        setCountry("");
                                                        setCountrycode("");
                                                        }
                                                    }}
                                                    onBlur={() => handleBlur("country")}
                                                />

                                                {errors.country && <p className="text-danger text-start mt-2">{errors.country}</p>}
                                            </div>


                                            <div className="phoneNumber">
                                                <input type="tel" value={phoneNumber}
                                                    id="phoneNumber"
                                                    onChange={(e) => {
                                                        const onlyNums = e.target.value.replace(/\D/g, "");
                                                        if (onlyNums.length <= 10) {
                                                            handleInputChange("phoneNumber", onlyNums);
                                                        }
                                                    }}
                                                    onBlur={() => handleBlur("phoneNumber")}
                                                    autoComplete="new-phoneNumber"
                                                    maxLength={10}
                                                    placeholder="Enter Pnone Number"
                                                />
                                                <label>Phone Number</label>
                                                {errors.phoneNumber && <p className="text-danger text-start mt-2">{errors.phoneNumber}</p>}
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
                                                    </div> : 'Register'}
                                                </button>
                                                {
                                                    Message !== "" && <div className="text-danger text-start mt-2">{Message}</div>
                                                }

                                            </div>
                                            <p className="text-dark mb-0">
                                                Do you have account?
                                                <Link href="/login" className="text-primary ms-1">
                                                    Login
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> : <OtpPage name={name} email={email} />}
            {/*/Login-Section*/}
        </>
    );
}
