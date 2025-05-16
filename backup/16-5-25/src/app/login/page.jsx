// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Login() {
//   const { user, login } = useAuth();
//   const router = useRouter();
//   // Local state for email and password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   useEffect(() => {
//     if (user) {
//       router.push("/user-dashboard"); // Redirect logged-in users
//     }
//   }, [user, router]);
  
//   useEffect(() => {
//     document.getElementById("email").value = "";
//     document.getElementById("password").value = "";
//   }, []);

//   // Function to validate inputs
//   const validateInputs = () => {
//     let newErrors = { email: "", password: "" };
//     let isValid = true;

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!emailRegex.test(email)) {
//       newErrors.email = "Enter a valid email address";
//       isValid = false;
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateInputs()) return; // Stop execution if validation fails

//     // Simulated API login response (Replace with your API call)
//     const fakeUserData = { email };
//     login(fakeUserData); // Call login from context

//     // Simulated API login response (Replace with your API call)
//     const fakeToken = "123456"; 
//     document.cookie = `authToken=${fakeToken}; path=/; max-age=86400;`; // Store token in cookie

//     router.push("/user-dashboard"); // Redirect after login
//   };

//   const handleInputChange = (field, value) => {
//     if (field === "email") setEmail(value);
//     if (field === "password") setPassword(value);
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
//   };

//   // Validate format when the user leaves the field
//   const handleBlur = (field) => {
//     let newErrors = { ...errors };
//     if (field === "email" && email.trim() && !emailRegex.test(email)) {
//       newErrors.email = "Enter a valid email address";
//     }
//     if (field === "password" && password.trim() && password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     setErrors(newErrors);
//   };

//   return (
//       <>
//         {/*Breadcrumb*/}
//         <section>
//           <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
//               <div className="header-text mb-0">
//                   <div className="container">
//                       <div className="text-center text-white">
//                           <h1 className="">Login</h1>
//                           <ol className="breadcrumb text-center">
//                               <li className="breadcrumb-item">
//                                 <Link href="/subscribe">Subscription</Link>
//                               </li>
//                               <li className="breadcrumb-item active text-white" aria-current="page">
//                                   Login
//                               </li>
//                           </ol>
//                       </div>
//                   </div>
//               </div>
//           </div>
//         </section>
//         {/*Breadcrumb*/}

//         {/*Login-Section*/}
//         <section className="sptb loginSec">
//           <div className="container customerpage">
//             <div className="row">
//               <div className="single-page">
//                 <div className="col-lg-5 col-xl-4 col-md-7 d-block mx-auto">
//                   <div className="wrapper wrapper2 border">
//                     <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleLogin}>
//                       <div className="mail">
//                         <input type="text" value={email}
//                           id="email"
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           onBlur={() => handleBlur("email")}
//                           autoComplete="off"
//                         />
//                         <label>Email Id</label>
//                         {errors.email && <p className="text-danger text-start mt-2">{errors.email}</p>}
//                       </div>
//                       <div className="passwd">
//                         <input type="password" value={password}
//                           id="password"
//                           onChange={(e) => handleInputChange("password", e.target.value)}
//                           onBlur={() => handleBlur("password")}
//                           autoComplete="new-password"
//                         />
//                         <label>Password</label>
//                         {errors.password && <p className="text-danger text-start mt-2">{errors.password}</p>}
//                       </div>
//                       <div className="submit">
//                         <button className="btn btn-primary btn-block" type="submit">
//                           Login
//                         </button>
//                       </div>
//                       <p className="mb-2">
//                         <Link href="/forgot-password">Forgot Password</Link>
//                       </p>
//                       <p className="text-dark mb-0">
//                         Don't have account?
//                         <Link href="/register" className="text-primary ms-1">
//                           Register
//                         </Link>
//                       </p>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/*/Login-Section*/}
//       </>
//   );
// }


"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  //const { user, login } = useAuth();
  const router = useRouter();
  // Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   const [message,setMessage]=useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // useEffect(() => {
  //   if (user) {
  //     router.push("/restaurants"); // Redirect logged-in users
  //   }
  // }, [user, router]);

 
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
 
    // document.cookie = `authToken=${fakeToken}; path=/; max-age=86400;`; // Store token in cookie

    setLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, { method: 'POST', body: JSON.stringify({ email: email.trim(), password: password.trim() }), headers: { "Content-Type": "application/json"} })

    const res = await response.json();
    setLoading(false);
    if (res.status) {

      console.log(res.url,"url");
      
     
    // router.push(res.url); // Redirect after login
      window.location.href=res.url
    }
    else{

      setMessage(res.message);
      
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
      <section>
        <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
          <div className="header-text mb-0">
            <div className="container">
              <div className="text-center text-white">
                <h1 className="">Login</h1>
                <ol className="breadcrumb text-center">
                  <li className="breadcrumb-item">
                    <Link href="/subscribe">Subscription</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    Login
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
              <div className="col-lg-5 col-xl-4 col-md-7 d-block mx-auto">
                <div className="wrapper wrapper2 border">
                  <div className="pt-5 pb-3 px-3">
                    <h4 className="text-center font-weight-semibold fs-18 m-0">
                      Login With Doctors Journey
                    </h4>
                  </div>
                  <form id="login" autoComplete="off" noValidate className="card-body" tabIndex={500} onSubmit={handleLogin}>
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
                    <div className="submit">
                      <button className="btn btn-primary btn-block" type="submit">
                        {loading ? <div className="spinner-border text-white" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>:'Login'}
                      </button>
                      {
                         message!=="" && <div className="text-danger text-start mt-2">{message}</div>
                      }
                    </div>
                    <p className="mb-2">
                      <Link href="/forgot-password">Forgot Password</Link>
                    </p>
                    <p className="text-dark mb-0">
                      Don't have account?
                      <Link href="/subscribe" className="text-primary ms-1">
                        Subscribe Now
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

