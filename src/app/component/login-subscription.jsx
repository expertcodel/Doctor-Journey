"use client"

import { useEffect } from "react"

export default function LoginSubscription() {
    return (
        <>
            <div className="container mt-5 p-0 rounded subscribeBox">
                <div className="row no-gutters single-page">
                    <div className="col-lg-5 col-xl-4 col-md-7 mx-auto">
                    <div className="wrapper wrapper2 border">
                        <div className="p-4 mb-2">
                        <h4 className="text-start font-weight-semibold fs-16 m-0">Login With Emigrant Foodie</h4>
                        </div>
                        <form id="login" className="card-body" tabIndex={500}>
                        <div className="mail">
                            <input type="email" name="mail" />
                            <label>Email Id</label>
                        </div>
                        <div className="passwd">
                            <input type="password" name="password" />
                            <label>Password</label>
                        </div>
                        <div className="submit">
                            <a className="btn btn-primary btn-block" href="index.html">
                            Login
                            </a>
                        </div>
                        <p className="mb-2">
                            <a href="forgot.html">Forgot Password</a>
                        </p>
                        <p className="text-dark mb-0">
                            Don't have account?
                            <a href="register.html" className="text-primary ms-1 fs-18">
                            Subscribe Now
                            </a>
                        </p>
                        </form>
                    </div>
                    </div>

                    <div className="col-md-8 offset-md-2 col-12 offset-0 d-none">
                    <div className="rowMain">
                        {/* rowContent */}
                        <div className="rowContent">
                        <h4 className="title">IMFoodie</h4>
                        <div className="rowBody">
                            <p>
                            Subscribe to ImmigrantFoodie Lisbon Map
                            </p>
                            <h3>
                            <strong><FontAwesomeIcon icon={faEuroSign} /> 1.99</strong> <small>per month</small>
                            </h3>
                            <p>
                            Please subscribe using the email you use with google mapsgain access to my google maps list with all of Immigrant FOodie's recommendations. Included are notes regarding my recommended dishes. Filter for different cuisines. Find what's neaby!
                            </p>
                        </div>
                        </div>

                        {/* paymentInfo */}
                        <div className="paymentInfo">
                        <div className="wrapper wrapper2">
                            {/* secRow */}
                            <div className="secRow">
                            <h4>Payment method</h4>
                            <ul className="list-unstyled">
                                <li>
                                <span><FontAwesomeIcon icon={faCreditCard} /></span> Card
                                </li>
                                <li>
                                <span><FontAwesomeIcon icon={faCreditCard} /></span> Apple Pay
                                </li>
                            </ul>
                            </div>

                            {/* secRow */}
                            <div className="secRow">
                            <h4>Card details</h4>

                            <form id="login" className="card-body" tabIndex={500}>
                                <div className="mail mb-5">
                                <input type="email" name="mail" />
                                <label>Card number</label>
                                </div>
                                <div className="mail mb-5">
                                <input type="email" name="password" />
                                <label>Email Address</label>
                                </div>
                                <div className="submit mb-0">
                                <button className="btn btn-primary btn-block" type="submit">
                                    Pay & Subscribe
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}