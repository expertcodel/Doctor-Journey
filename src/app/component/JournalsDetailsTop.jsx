"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthorsThumbCarousel from "./AuthorsThumbCarousel";
import JournalsDetailsBanner from "./JournalsDetailsBanner";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JournalsDetailsTop({ doctorProfile }) {
    const sidebarRef = useRef(null);
    const pageTopTriggerRef = useRef(null);
    const pageBottomTriggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const circleRef = useRef(null);

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

            <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                    <div className="card">
                        <div className="card-body detailCardTop detailSideCardTop">
                            <div className='row'>
                                <div className='col-md-5 col-12'>
                                    <JournalsDetailsBanner />
                                </div>

                                <div className='col-md-7 col-12'>
                                    <h3>
                                        journal 1
                                        <span className='reviewSec'>
                                            <span className="reviewText">
                                                4.2 <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <em className='totalReviews'>3620 <span>Reviews</span></em>
                                        </span>
                                    </h3>
                                    <p>
                                        Paperback – 2025-06-16
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>

                                <div className="col-12 mt-5">
                                    <h4 className="mainHeading">
                                        Related Author's
                                    </h4>
                                    <div className="row">
                                        <div className="col-12 drShortDesc">
                                            <AuthorsThumbCarousel doctorProfile={doctorProfile} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-5">
                                    <div className="tab-content mobileTabs">
                                        <div>
                                            <div className="wideget-user-tab">
                                                <div className="tab-menu-heading">
                                                    <div className="tabs-menu1 customeTabs">
                                                        <ul className="nav">
                                                            <li className="">
                                                                <a href="#tab-1" className="active" data-bs-toggle="tab">
                                                                    Overview
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-2" data-bs-toggle="tab" className="">
                                                                    Contents
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-3" data-bs-toggle="tab" className="">
                                                                    Reviews
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-4" data-bs-toggle="tab" className="">
                                                                    FAQ
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane active" id="tab-1">
                                            <div className="card mb-0 border-0">
                                                <div className="card-body">
                                                    Tabs1
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane userprof-tab" id="tab-2">
                                            {/*Job listing*/}
                                            <div className="card mb-0 border-0">
                                                <div className="card-body">
                                                    Tabs2
                                                </div>
                                            </div>
                                            {/*Job Listing*/}
                                        </div>

                                        <div className="tab-pane" id="tab-3">
                                            <div className="card border-0">
                                                <div className="card-body">
                                                    <h3 className="card-title">Rating And Reviews</h3>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="badge badge-default mb-2">
                                                                5 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-success w-100">
                                                                    6,532
                                                                </div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                4 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-primary w-80">
                                                                    7,532
                                                                </div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                3 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-info w-60">3,526</div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                2 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-warning w-60">485</div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                1 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-0">
                                                                <div className="progress-bar bg-danger w-20">126</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 text-center align-items-center"></div>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="media mt-0 p-5">
                                                        <div className="d-flex me-3">
                                                            <a href="javascript:void(0);">
                                                                <img className="media-object brround" alt="64x64" src="../assets/images/users/male/1.jpg" />{" "}
                                                            </a>
                                                        </div>
                                                        <div className="media-body">
                                                            <h5 className="mt-0 mb-1 font-weight-semibold">
                                        Joanne Scott
                                        <span
                                        className="fs-14 ms-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title=""
                                        data-bs-original-title="verified"
                                        >
                                        <i className="fa fa-check-circle-o text-success" />
                                        </span>
                                        <span className="fs-14 ms-2">
                                        {" "}
                                        4.5 <i className="fa fa-star text-yellow" />
                                        </span>
                                    </h5>
                                                            <small className="text-muted">
                                        <i className="fa fa-calendar" /> Dec 21st{" "}
                                        <i className=" ms-3 fa fa-clock-o" /> 13.00{" "}
                                        <i className=" ms-3 fa fa-map-marker" /> Brezil
                                    </small>
                                                            <p className="font-13  mb-2 mt-2">
                                                                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                            </p>
                                                            <a href="javascript:void(0);" className="me-2">
                                                                <span className="badge bg-primary">Helpful</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                <span className="">Comment</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#report">
                                                                <span className="">Report</span>
                                                            </a>
                                                            <div className="media mt-5">
                                                                <div className="d-flex me-3">
                                                                    <a href="javascript:void(0);">
                                            {" "}
                                            <img
                                            className="media-object brround"
                                            alt="64x64"
                                            src="../assets/images/users/female/2.jpg"
                                            />{" "}
                                        </a>
                                                                </div>
                                                                <div className="media-body">
                                                                    <h5 className="mt-0 mb-1 font-weight-semibold">
                                            Rose Slater{" "}
                                            <span
                                            className="fs-14 ms-0"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title=""
                                            data-bs-original-title="verified"
                                            >
                                            <i className="fa fa-check-circle-o text-success" />
                                            </span>
                                        </h5>
                                                                    <small className="text-muted">
                                            <i className="fa fa-calendar" /> Dec 22st{" "}
                                            <i className=" ms-3 fa fa-clock-o" /> 6.00{" "}
                                            <i className=" ms-3 fa fa-map-marker" /> Brezil
                                        </small>
                                                                    <p className="font-13  mb-2 mt-2">
                                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris commodo Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur consequat.
                                                                    </p>
                                                                    <a href="" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                        <span className="badge badge-default">Comment</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media p-5 border-top mt-0">
                                                        <div className="d-flex me-3">
                                                            <a href="javascript:void(0);">
                                        {" "}
                                        <img
                                        className="media-object brround"
                                        alt="64x64"
                                        src="../assets/images/users/male/3.jpg"
                                        />{" "}
                                    </a>
                                                        </div>
                                                        <div className="media-body">
                                                            <h5 className="mt-0 mb-1 font-weight-semibold">
                                        Edward
                                        <span
                                        className="fs-14 ms-0"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title=""
                                        data-bs-original-title="verified"
                                        >
                                        <i className="fa fa-check-circle-o text-success" />
                                        </span>
                                        <span className="fs-14 ms-2">
                                        {" "}
                                        4 <i className="fa fa-star text-yellow" />
                                        </span>
                                    </h5>
                                                            <small className="text-muted">
                                        <i className="fa fa-calendar" /> Dec 21st{" "}
                                        <i className=" ms-3 fa fa-clock-o" /> 16.35{" "}
                                        <i className=" ms-3 fa fa-map-marker" /> UK
                                    </small>
                                                            <p className="font-13  mb-2 mt-2">
                                                                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                            </p>
                                                            <a href="javascript:void(0);" className="me-2">
                                                                <span className="badge bg-primary">Helpful</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                <span className="">Comment</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#report">
                                                                <span className="">Report</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-0">
                                                <div className="card-header">
                                                    <h3 className="card-title">Leave a reply</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div>
                                                        <div className="mb-3">
                                                            <input type="text" className="form-control" placeholder="Your Name" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <input type="email" className="form-control" placeholder="Email Address" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <textarea className="form-control" name="example-textarea-input" rows={6} placeholder="Comment" defaultValue={ ""} />
                                                        </div>
                                                        <a href="javascript:void(0);" className="btn btn-primary">
                                    Send Reply
                                    </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="tab-4">
                                            <div className='card border-0'>
                                                <div className='card-body'>
                                                    Tabs4
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-12 col-12">
                    <div
                        ref={sidebarRef}
                        className={`participateSidebar journalsPriceSec ${isSticky ? "" : ""}`}
                    >
                        <div className="drCard w-100">
                            <div className="card mb-0">
                                <div className="item7-card-img">
                                    <Link href="/" />
                                    <Image src="/images/dr-banners/banner-1.webp" fill alt="img" className="cover-image" unoptimized />
                                    <div className="play-button">
                                        <span className="triangle"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            </div>

            {/* Bottom of section observer trigger */}
            <div ref={pageBottomTriggerRef} style={{ height: "1px", marginBottom: "-1px" }}></div>
        </>
    );
}
