import Link from "next/link";

export default function Conatct() {
    return (
        <>
            {/*Breadcrumb*/}
            <section>
                <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                    <div className="header-text mb-0">
                        <div className="container">
                            <div className="text-center text-white">
                                <h1 className="">Contact Us</h1>
                                <ol className="breadcrumb text-center">
                                    <li className="breadcrumb-item">
                                        <Link href="/user-dashboard">Restaurants</Link>
                                    </li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">
                                        Contact us
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Breadcrumb*/}

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