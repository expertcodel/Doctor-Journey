"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";

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
