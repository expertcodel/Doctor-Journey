"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";

export default function Register() {
  const { user, login } = useAuth();
  const router = useRouter();
  // Local state for email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const phoneRegex = /^\d{10}$/;

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
    document.getElementById("country").value = "";
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

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be at least 10 characters";
      isValid = false;
    }

    if (!country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop execution if validation fails

    // Simulated API login response (Replace with your API call)
    // const fakeUserData = { email };
    // login(fakeUserData); // Call login from context

    // // Simulated API login response (Replace with your API call)
    // const fakeToken = "123456"; 
    // document.cookie = `authToken=${fakeToken}; path=/; max-age=86400;`; // Store token in cookie

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phoneNumber, password, country }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        localStorage.setItem("tempEmail", email);
        localStorage.setItem("tempPhone", phoneNumber);
        router.push('/verify-otp', {
          state: { email, phoneNumber },
        });
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "phoneNumber") setPhoneNumber(value);
    if (field === "country") setCountry(value);
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
    setErrors(newErrors);
  };

  return (
      <>
        {/*Breadcrumb*/}
        <Breadcrumb title="Register" />

        {/*Login-Section*/}
        <section className="sptb loginSec">
          <div className="container customerpage">
            <div className="row">
              <div className="single-page">
                <div className="col-md-4 d-block mx-auto">
                  <div className="wrapper wrapper2 border">
                    <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleRegister}>
                      <div className="mail">
                        <input type="text" value={name}
                          id="name"
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          autoComplete="off"
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
                        />
                        <label>Email Id</label>
                        {errors.email && <p className="text-danger text-start mt-2">{errors.email}</p>}
                      </div>
                      <div className="passwd">
                        <input type="password" value={password}
                          id="password"
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          onBlur={() => handleBlur("password")}
                          autoComplete="new-password"
                        />
                        <label>Password</label>
                        {errors.password && <p className="text-danger text-start mt-2">{errors.password}</p>}
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
                        />
                        <label>Phone Number</label>
                        {errors.phoneNumber && <p className="text-danger text-start mt-2">{errors.phoneNumber}</p>}
                      </div>
                      <div className="country">
                        <input type="country" value={country}
                          id="country"
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          onBlur={() => handleBlur("country")}
                          autoComplete="new-country"
                        />
                        <label>Country</label>
                        {errors.country && <p className="text-danger text-start mt-2">{errors.country}</p>}
                      </div>
                      <div className="submit">
                        <button className="btn btn-primary btn-block" type="submit">
                          Register
                        </button>
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
        </section>
        {/*/Login-Section*/}
      </>
  );
}
