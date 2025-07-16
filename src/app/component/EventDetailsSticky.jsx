"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import MembersCardsCarousel from "./MembersCardsCarousel";
import MembersCardsCarousel2 from "./MembersCardsCarousel2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import SmoothScrollLink from "./SmoothScrollLink";

export default function EventDetailsSticky() {
    const [width, setWidth] = useState(0);
    const sidebarRef = useRef(null);
    const pageTopTriggerRef = useRef(null);
    const pageBottomTriggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const circleRef = useRef(null);

    useEffect(() => {
        const updateSize = () => {
            setWidth(window.innerWidth);
        };

        updateSize(); // Initial call
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sidebarTop = sidebarRef.current?.getBoundingClientRect().top;
            const isAboveTopTrigger = pageTopTriggerRef.current?.getBoundingClientRect().bottom <= 0;
            const isBelowBottomTrigger = pageBottomTriggerRef.current?.getBoundingClientRect().top > window.innerHeight;

            const shouldStick = isAboveTopTrigger && isBelowBottomTrigger && sidebarTop <= 100;
            setIsSticky(shouldStick);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;

            if (circleRef.current) {
            const currentRotation = parseFloat(circleRef.current.style.getPropertyValue('--circle-angle')) || 0;
            const newRotation = currentRotation + scrollDelta * 0.5; // adjust multiplier for speed
            circleRef.current.style.setProperty('--circle-angle', `${newRotation}deg`);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* Top of section observer trigger */}
            <div ref={pageTopTriggerRef} style={{ height: "1px", marginTop: "-1px" }}></div>

            <div className="eventDetailsOuter">
                <div className="eventDetailsLeftSide">
                    <div
                        ref={sidebarRef}
                        className={`participateSidebar ${isSticky ? "stickSideBar" : ""}`}
                    >
                        <figure ref={circleRef}>
                            <Image src="/images/svg/gps.svg" className="img-fluid" alt="image" width={150} height={150} />
                        </figure>
                        <h4>
                            <span>Introduce with</span> PARTICIPATORY ORGANISATION
                        </h4>
                        <p>
                            Supporters from different organizations who participated in remarkable program.
                        </p>
                        <Link className="btn btn-primary" href="/">
                            Expolere All
                        </Link>
                    </div>
                </div>

                <div className="eventDetailsRightSide">
                    <section className="sectionSpace sptb aboutMain bg-white">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="row g-md-4 g-3">
                                <div className='col-12'>
                                    <div className="upcomingEventsBox detailsEventBox">
                                        <div className="row g-md-4 g-3">
                                            <div className='col-xl-5 offset-xl-0 col-lg-8 offset-lg-2 col-12'>
                                                <div className='eventDetailImg'>
                                                    <figure>
                                                        <Image src="/images/events/dummy-event-detail.jpg" width={1808} height={2315} alt="img" className="img-fluid" />
                                                    </figure>

                                                    <div className='CountDownBoxMain'>
                                                        <CountdownTimer />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-xl-7 col-lg-12 col-12'>
                                                <div className='aboutBody'>
                                                    <h4>
                                                        Upcoming Events
                                                    </h4>
                                                    <h5>
                                                        International Conference on Forensic Science 2026
                                                        <span>
                                                            Organized by International Association of Scientists & Researchers & AGHAM Forensika
                                                        </span>
                                                    </h5>
                                                    <p>
                                                        International Association of Scientists and Researchers (IASR) in collaboration with the University of Philippines Manila, University of Baguio, Holy Angel University, Tarlac State University brings the 17th IASR International Conference on Forensic Science and the 7th International Forensic Science Conference to be held on 2nd–5th December 2026 in New Delhi, India. The International Conference on Forensic Science serves as a premier platform for experts, researchers, and practitioners in the field to exchange knowledge, explore innovations, and discuss advancements in forensic methodologies.
                                                    </p>
                                                    <h6>
                                                        Click here to <a href="#" target="_blank">Submit Abstract</a>
                                                    </h6>
                                                    <div className="customInputWrapper p-3 rounded-4 border border-secondary-subtle bg-white">
                                                        {/* Location Input Group */}
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text bg-white border-0">
                                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                            </span>
                                                            <input type="text" className="form-control border-0" defaultValue="Vallabhbhai Patel Chest Institute. New Delhi" disabled readOnly="" />
                                                        </div>
                                                        {/* Date Input Group */}
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white border-0">
                                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                            </span>
                                                            <input type="text" className="form-control border-0" defaultValue="02 December, 2025" disabled readOnly="" />
                                                        </div>
                                                    </div>

                                                    <div className='d-flex'>
                                                        <SmoothScrollLink className="btn btn-primary me-2" href="#viewSchedule">
                                                            View Program Schedule
                                                        </SmoothScrollLink>
                                                        <SmoothScrollLink className="btn btn-info" href="#registerForm">
                                                            Registeration Details
                                                        </SmoothScrollLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*Register Tables*/}
                    <section className="sptb">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="section-title center-block text-center">
                                <h2>Select Registeration Plan</h2>
                            </div>
                            <div className={width >= 1280 ? "container" : "container"} id="registerForm">
                                <div className="row">
                                    <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
                                        <div className="pricingTable">
                                            <div className="price-value">
                                                ₹1000
                                            </div>
                                            <h3 className="title">Undergraduate</h3>
                                            <ul className="pricing-content">
                                                <li>
                                                    Only Paper/Poster & Winner Certificate
                                                </li>
                                                <li>
                                                    Access Online Paper/Poster Presentation
                                                </li>
                                                <li>
                                                    Certificate Verification & Validation
                                                </li>
                                                <li>
                                                    Presentation Schedule will be shared on Email Only
                                                </li>
                                                <li>
                                                    Only WhatsApp on <b>+919818877002</b>
                                                </li>
                                                <li>
                                                    For Confirmation Email Check <b>SPAM</b> Too
                                                </li>
                                            </ul>
                                            <Link href="/" className="pricingTable-signup">
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
                                        <div className="pricingTable">
                                            <div className="price-value">
                                                ₹1500
                                            </div>
                                            <h3 className="title">Postgraduate</h3>
                                            <ul className="pricing-content">
                                                <li>
                                                    Only Paper/Poster & Winner Certificate
                                                </li>
                                                <li>
                                                    Access Online Paper/Poster Presentation
                                                </li>
                                                <li>
                                                    Certificate Verification & Validation
                                                </li>
                                                <li>
                                                    Presentation Schedule will be shared on Email Only
                                                </li>
                                                <li>
                                                    Only WhatsApp on <b>+919818877002</b>
                                                </li>
                                                <li>
                                                    For Confirmation Email Check <b>SPAM</b> Too
                                                </li>
                                            </ul>
                                            <Link href="/" className="pricingTable-signup">
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
                                        <div className="pricingTable">
                                            <div className="price-value">
                                                ₹2000
                                            </div>
                                            <h3 className="title">Scholar</h3>
                                            <ul className="pricing-content">
                                                <li>
                                                    Only Paper/Poster & Winner Certificate
                                                </li>
                                                <li>
                                                    Access Online Paper/Poster Presentation
                                                </li>
                                                <li>
                                                    Certificate Verification & Validation
                                                </li>
                                                <li>
                                                    Presentation Schedule will be shared on Email Only
                                                </li>
                                                <li>
                                                    Only WhatsApp on <b>+919818877002</b>
                                                </li>
                                                <li>
                                                    For Confirmation Email Check <b>SPAM</b> Too
                                                </li>
                                            </ul>
                                            <Link href="/" className="pricingTable-signup">
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*Register Tables*/}

                    {/*Download*/}
                    <section className="banner-1 cover-image sptb bg-background2">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="section-title center-block text-center text-white">
                                <h2>Download</h2>
                                <p>
                                    Access necessary content
                                </p>
                            </div>
                            <div className="item-all-cat">
                                <div className="row category-type g-md-4 g-3 justify-content-center">
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="item-all-card text-dark text-center card mb-lg-0">
                                            <Link href="/" />
                                            <div className="iteam-all-icon1">
                                                <Image src="/images/svgs/jobs/house-white.svg" className="imag-service" alt="Sales" width={112} height={38} />
                                            </div>
                                            <div className="item-all-text mt-3">
                                                <h5 className="mb-0 text-body">Conference Brochure</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="item-all-card text-dark text-center card mb-lg-0">
                                            <Link href="/" />
                                            <div className="iteam-all-icon1">
                                                <Image src="/images/svgs/jobs/calendar-white.svg" className="imag-service" alt="Driver" width={112} height={38} />
                                            </div>
                                            <div className="item-all-text mt-3">
                                                <h5 className="mb-0 text-body">Format for Paper Abstract</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="item-all-card text-dark text-center card  mb-sm-0">
                                            <Link href="/" />
                                            <div className="iteam-all-icon1">
                                                <Image src="/images/svgs/jobs/hourglass-white.svg" className="imag-service" alt="IT-Hardware" width={112} height={38} />
                                            </div>
                                            <div className="item-all-text mt-3">
                                                <h5 className="mb-0 text-body">Format for Poster Abstract</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="item-all-card text-dark text-center card mb-0">
                                            <Link href="/" />
                                            <div className="iteam-all-icon1">
                                                <Image src="/images/svgs/jobs/businessman-white.svg" className="imag-service" alt="Software" width={112} height={38} />
                                            </div>
                                            <div className="item-all-text mt-3">
                                                <h5 className="mb-0 text-body">Template for Paper Presentation</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="item-all-card text-dark text-center card mb-0">
                                            <Link href="/" />
                                            <div className="iteam-all-icon1">
                                                <Image src="/images/svgs/jobs/businessman-white.svg" className="imag-service" alt="Software" width={112} height={38} />
                                            </div>
                                            <div className="item-all-text mt-3">
                                                <h5 className="mb-0 text-body">Template for Paper Presentation</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*/Download*/}

                    {/* All About Program */}
                    <section className="sectionSpace sptb bg-white">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="row">
                                <div className="col-12">
                                <div className="section-title center-block text-center">
                                    <h3>All About Program</h3>
                                    <p>Get your queries resolve here</p>
                                </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                <div className="accordion accordion-box" id="faqAccordion">
                                    {/* Block 1 */}
                                    <div className="accordion-item block">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Interdum et malesuada fames ac ante ipsum
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body content">
                                        Suspendisse finibus urna mauris, vitae consequat quam vel.
                                        </div>
                                    </div>
                                    </div>

                                    {/* Block 2 */}
                                    <div className="accordion-item block">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Maecenas condimentum sollicitudin ligula
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body content">
                                        Suspendisse finibus urna mauris, vitae consequat quam vel.
                                        </div>
                                    </div>
                                    </div>

                                    {/* Block 3 */}
                                    <div className="accordion-item block">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Duis rhoncus orci ut metus rhoncus
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body content">
                                        Suspendisse finibus urna mauris, vitae consequat quam vel.
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Organising Body */}
                    <section className="sectionSpace sptb bg-white">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="row">
                                <div className="col-12">
                                    <h4 className="mainHeading">
                                        Organising Body
                                        <Link href="/">View all</Link>
                                    </h4>
                                    <p>
                                        Our core team of creative & proficient members who actively & enthusiastically put their splendid efforts in organizing clued-up events
                                    </p>
                                </div>
                            </div>

                            <div className="row g-md-4 g-3">
                                <div className="col-12">
                                    <MembersCardsCarousel />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Committee */}
                    <section className="sectionSpace sptb bg-white">
                        <div className={width >= 1280 ? "container" : "container"}>
                            <div className="row">
                                <div className="col-12">
                                    <h4 className="mainHeading">
                                        Core Committee
                                        <Link href="/">View all</Link>
                                    </h4>
                                    <p>
                                        A strong support always ensures unstoppable and excellent work which is being done for a good cause & we’re grateful to have such support that always keeps us growing
                                    </p>
                                </div>
                            </div>

                            <div className="row g-md-4 g-3">
                                <div className="col-12">
                                    <MembersCardsCarousel2 />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Bottom of section observer trigger */}
            <div ref={pageBottomTriggerRef} style={{ height: "1px", marginBottom: "-1px" }} id="viewSchedule"></div>
        </>
    );
}
