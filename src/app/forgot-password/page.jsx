"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user]);
  return (
      <>
        {/*Breadcrumb*/}
        <section>
          <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
              <div className="header-text mb-0">
                  <div className="container">
                      <div className="text-center text-white">
                          <h1 className="">Forgot Password</h1>
                          <ol className="breadcrumb text-center">
                              <li className="breadcrumb-item">
                                  <Link href="/user-dashboard">Restaurants</Link>
                              </li>
                              <li className="breadcrumb-item active text-white" aria-current="page">
                                  Forgot Password
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
                    <form id="login" className="card-body" tabIndex={500}>
                        <div className="mail">
                            <input type="email" name="mail" />
                            <label>Email Id</label>
                        </div>
                        <div className="submit">
                            <button className="btn btn-primary btn-block" type="submit">
                                Send
                            </button>
                        </div>
                        <div class="text-center text-dark mb-0">
                            Forget it, <Link href="/login">send me back</Link> to the sign in.
                        </div>
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
