"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import Image from "next/image";

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
        <Breadcrumb title="Forgot Password" />

        {/*Login-Section*/}
        <section className="sptb loginSec">
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
                      <form id="login" className="card-body" tabIndex={500}>
                        <h3 className="pb-2">Forgot Password</h3>
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
          </div>
        </section>
        {/*/Login-Section*/}
      </>
  );
}
