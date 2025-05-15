import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";

export default function Conatct() {
    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Contact us" />

            {/*Contact*/}
            <div className="sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="single-page">
                            <div className="col-lg-5 col-xl-4 col-md-6 d-block mx-auto">
                                <div className="wrapper wrapper2">
                                    <form id="login" className="card-body" tabIndex={500}>
                                        <div className="mail mb-5">
                                            <input type="email" name="mail" />
                                            <label>Your Name</label>
                                        </div>
                                        <div className="email mb-5">
                                            <input type="email" name="password" />
                                            <label>Email Address</label>
                                        </div>
                                        <div className="message mb-5">
                                            <textarea className="form-control" name="example-textarea-input" rows={6} defaultValue={ ""} />
                                            <label>Message</label>
                                        </div>
                                        <div className="submit mb-0">
                                            <a className="btn btn-primary btn-block" href="index.html">
                            Send Message
                        </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Contact*/}
        </>
    )
}