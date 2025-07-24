"use client"
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faCreditCard, faEuro, faEuroSign, faStar } from "@fortawesome/free-solid-svg-icons";
import Select2Component from "../../app/component/Select2Component";
import ThumbnailSearchCarousel from "../../app/component/ThumbnailSearchCarousel";
import ThumbnailSponsorCarousel from "../../app/component/ThumbnailSponsorCarousel";
import ThumbnailBlogsCarousel from "../../app/component/ThumbnailBlogsCarousel";
import TestimonialsCarousel from "../../app/component/Testimonials";
import JournalsThumbCarousel from "../component/JournalsThumbCarousel";
//  import doctorProfile from "@/data/doctorProfile.json";
import RangeSlider from "./RangeSlider";
export default function JournalActivity({ journalCard, totalItems }) {




    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [journalList, setjournalList] = useState(journalCard);
    const [name, setName] = useState("");
    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal/journals-list/?page=${1}&name=${name}`);
        setName(name);
setIdx(1);
        const res = await response.json();
        if (res.status) {
            setjournalList(res.journallist);
            setButton(Math.ceil(res.totalItems / 9));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal/journals-list/?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setjournalList(res.journallist);
                setButton(Math.ceil(res.totalItems / 9));
            }

        }


    }




    return (
        <section>
            {/*Breadcrumb*/}

            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite journals
                                    </h1>
                                </div>
                                <div className="search-background bg-transparent">
                                    <div className="form row no-gutters ">
                                        <div className="col-xl-4 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                            <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" onChange={(e) => searching(idx, e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                            <input type="text" className="form-control input-lg br-md-0" id="text5" placeholder="Select Location" />
                                            <span>
                                                <Image
                                                    src="/images/svg/gps.svg"
                                                    className="location-gps-sm"
                                                    alt="image" width={150} height={150}
                                                />
                                            </span>
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-12 select2-lg  mb-0 bg-white form-group">
                                            <Select2Component id="select2"
                                                options={[
                                                    { value: "1", label: "South Indian" },
                                                    { value: "2", label: "North Indian" },
                                                    { value: "3", label: "West Indian" },
                                                    { value: "4", label: "Australia" },
                                                    { value: "5", label: "Afgani" },
                                                    { value: "6", label: "Russian" },
                                                ]}
                                                select2Options={{ placeholder: "Select category", allowClear: true }}
                                                showSearch={true} />
                                        </div>
                                        <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                                            <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                                Search Here
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* users JOURNEY */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">

                    <div className="row">
                        <div className="col-12 item2-gl">
                            <div className="p-md-5 p-3 bg-white item2-gl-nav d-sm-flex d-block">
                                <h6 className="mb-0 mt-3">
                                    Showing <b>1 to 10</b> of 30 Entries
                                </h6>
                                <ul className="nav item2-gl-menu mt-1 ms-auto">
                                    {/* <li className="d-flex align-items-center">
                                        <button className="active" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                            <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                        </button>
                                    </li> */}
                                </ul>
                                <div className="d-flex align-items-center">
                                    <span className="customFilter">
                                        <button className="active" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                            <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                        </button>
                                    </span>
                                    <label className="me-2 mt-2 mb-sm-1">Sort By:</label>
                                    <Select2Component id="select1" options={[{ value: "1", label: "Relavant" }, { value: "2", label: "Newest First" }, { value: "3", label: "Highest Paid" }, { value: "4", label: "Lowest Paid" }, { value: "5", label: "High Ratings" }, {
                                        value: "6", label:
                                            "Popular"
                                    },]} select2Options={{ placeholder: "Select a fruit", allowClear: true }} showSearch={false} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="offcanvas offcanvas-end filterMainSec" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Select Filter</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                            </div>
                            <div className="offcanvas-body">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Specialization</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="" id="container">
                                            <div className="filter-product-checkboxs">
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                    <span className="custom-control-label">
                                                        Cardiacsurgeon
                                                        <span className="label label-secondary float-end">
                                                            14
                                                        </span>
                                                    </span>
                                                </label>
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                    <span className="custom-control-label">
                                                        Dermatologist
                                                        <span className="label label-secondary float-end">
                                                            14
                                                        </span>
                                                    </span>
                                                </label>
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox3" defaultValue="option3" />
                                                    <span className="custom-control-label">
                                                        Gastroenterologist
                                                        <span className="label label-secondary float-end">
                                                            10
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Views</h3>
                                    </div>
                                    <div className="card-body">
                                        <h6>
                                            <label htmlFor="price">Views:</label>
                                            <RangeSlider />
                                        </h6>
                                        {/* <div id="mySlider" /> */}
                                    </div>
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Rating</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                <span className="custom-control-label">Any</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">3.5</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">4.0</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-0">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">4.5</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-0">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">5</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Location</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                <span className="custom-control-label">Delhi</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Noida</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Gurugram</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-warning btn-block">
                                            Apply Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        {/* jrLargeCard */}
                        {journalList.map((journal) => <div className="col-md-4 col-12 jrLargeCard" key={journal.journalsId}>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href={`/journals/${journal.journalsUrl}`} />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src={journal.imageUrl} className="img-fluid" fill alt="" />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                {journal.journalsName}
                                            </h5>
                                            <small className="badge">
                                                INR {journal.price}/
                                            </small>
                                            <div className="catFooter">
                                                <Link href={`/journals/${journal.journalsUrl}`} className="btn btn-warning">
                                                    Read Now
                                                </Link>
                                                <Link href={`/journals/${journal.journalsUrl}`} className="btn btn-primary">
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                    </div>


                    <div className="row g-md-4 g-3">
                        <div className="col-12">
                            <div className="center-block text-center d-flex justify-content-center">
                                {button > 1 && <ul className="pagination mb-5 mb-lg-0">
                                    <li className="page-item page-prev">
                                        <button className="page-link" onClick={() => pagination(idx - 1)} tabIndex={-1}>
                                            Prev
                                        </button>
                                    </li>
                                    {Array.from({ length: button }, (_, i) => <li className="page-item active" key={i}>
                                        <button className="page-link" onClick={() => pagination(i + 1)} style={{ backgroundColor: idx === i + 1 && 'orange' }}>
                                            {i + 1}
                                        </button>
                                    </li>)}

                                    <li className="page-item page-next">
                                        <button className="page-link" onClick={() => pagination(idx + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}