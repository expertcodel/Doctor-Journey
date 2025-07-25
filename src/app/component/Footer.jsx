"use client"

import { faFacebookF, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect } from "react"

export default function Footer() {
    return (
        <>
        {/*Subscribe section*/}
            <section className="sptb shapeParentDiv subscribe-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 m-auto">
                            <div className="section-title center-block text-center">
                                <h2>Subscribe To Our Newsletter</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
                            <form className="newsletter-form" data-toggle="validator">
                                <div className="input-group sub-input mt-1">
                                    <input type="text" className="form-control input-lg " placeholder="Enter your Email" />
                                    <div className="">
                                        <button type="button" className="btn btn-primary btn-lg br-tr-3  br-br-3">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="shape4" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/banner-shape14.png" alt="image" />
                </div>
                <div className="shape13" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape6.png" alt="image" />
                </div>
                <div className="shape14" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape13.png" alt="image" />
                </div>
                <div className="shape15" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape14.png" alt="image" />
                </div>
            </section>
        {/*Subscribe section*/}

        {/*Footer Section*/}
        <footer className="bg-dark text-white footerMain" data-image-src="../assets/images/banners/banner3.jpg">
            <div className="footer-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            <h6>Disclaimer</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    The content provided on the DoctorsJourney platform is for informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding a medical condition. DoctorsJourney does not endorse or guarantee the accuracy of third-party content or publications linked through our platform.
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <h6>Popular Links</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> Journals
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> Events
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faCaretRight} /> About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <h6>Help</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link href="/blog">Blogs</Link>
                                </li>
                                <li>
                                    <Link href="/">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <h6 className="mb-2">Follow Us</h6>
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