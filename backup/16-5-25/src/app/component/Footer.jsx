"use client"

import { faFacebookF, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect } from "react"

export default function Footer() {
    return (
        <>
        {/*Footer Section*/}
        <footer className="bg-dark text-white cover-image footerMain" data-image-src="../assets/images/banners/banner3.jpg">
            <div className="footer-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-12">
                            <h6>Job Categories</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/">Developement</Link>
                                </li>
                                <li>
                                    <Link href="/">Designing</Link>
                                </li>
                                <li>
                                    <Link href="/">Marketing</Link>
                                </li>
                                <li>
                                    <Link href="/">Others</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <h6>Job Type</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/">Work from home</Link>
                                </li>
                                <li>
                                    <Link href="/">Internship</Link>
                                </li>
                                <li>
                                    <Link href="/">Part time</Link>
                                </li>
                                <li>
                                    <Link href="/">Full time</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <h6>Resources</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/">Support</Link>
                                </li>
                                <li>
                                    <Link href="/">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="/">Contact Details</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <h6>Popular Ads</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> Educational college Ads
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> Free Lancer for Web Developer
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> Searching for Developer
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> BPO Online In Bangalore
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <h6 className="mb-2">Subscribe</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <div className="input-group w-100">
                                <input type="text" className="form-control  border" placeholder="Email" />
                                <div className="">
                                    <button type="button" className="btn btn-primary ">
                                        {" "} Subscribe{" "}
                                    </button>
                                </div>
                            </div>
                            <h6 className="mb-2 mt-5">Follow Us</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="payments mb-0">
                                <li>
                                    <Link href="/" className="payments-icon">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="payments-icon">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="payments-icon">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="text-white-50 p-0">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-12 my-3 text-center">
                            2025 Doctors Journey, All rights reserved. | Powered by {" "}
                            <a href="https://expertcodelab.com/" target="_blank" className="fs-14 text-white">
                                Expert Code Lab Pvt Ltd
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-white p-0 border-top">
                <div className="container">
                    <div className="p-2 text-center footer-links">
                        <Link href="/privacy-policy" className="btn btn-link">
                            Privacy Policy
                        </Link>
                        <Link href="terms-condition" className="btn btn-link">
                            Terms Of Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
        {/*Footer Section*/}
        </>
    )
}