"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "../component/Select2Component";
//  import doctorProfile from "@/data/doctorProfile.json";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faBuilding, faCalendar, faChevronRight, faClock, faFilter, faLocation, faLocationArrow, faMap, faStar, faTimesCircle, faUsd, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from "../component/RangeSlider";

export default function DoctorList({ doctorProfile, totalItems }) {

    const [doctorLists, setdoctorLists] = useState(doctorProfile);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");

    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${idx}&name=${name}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setdoctorLists(res.doctorlist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.doctorlist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }

    return (
        <>
            {/* search engine */}
            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite videos
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

            {/*Restaurants listing*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/*Restaurants lists*/}
                            <div className=" mb-lg-0">
                                <div className="">
                                    <div className="item2-gl">
                                        <div className=" mb-0">
                                            <div className="">
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
                                        </div>

                                        <div className="tab-content">
                                            <div className="tab-pane active">
                                                {
                                                    doctorLists.map((item, idx) => (
                                                        <div key={idx} className="card overflow-hidden br-0 overflow-hidden customCard">
                                                            <div className="customCardSec">
                                                                <div className="p-0 m-0 item-card9-img">
                                                                    <div className="item-card9-imgs">

                                                                        <div id={`carousel-${item.doctorId}`} className="carousel slide customCarousel" data-bs-ride="carousel">

                                                                            <div className="carousel-inner">
                                                                                <div className="carousel-item active">
                                                                                    <figure>
                                                                                        <Image
                                                                                            unoptimized
                                                                                            src={item.profileImage} width={368} height={190}
                                                                                            alt={item.doctorName}
                                                                                            className="cover-image"
                                                                                        />
                                                                                    </figure>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card overflow-hidden  border-0 box-shadow-0 border-start br-0 mb-0">
                                                                    <div className="card-body pt-3 pt-md-5">
                                                                        <div className="item-card9">
                                                                            <Link href={`/doctor-profile/${item.doctorId}`} className="text-dark">
                                                                                <h4 className="font-weight-semibold mt-1">
                                                                                    {item.doctorName}
                                                                                </h4>
                                                                            </Link>
                                                                            <div className="mt-2 mb-2">
                                                                                <span className="me-4">
                                                                                    <FontAwesomeIcon icon={faMap} />{" "}
                                                                                    {item.specialization}
                                                                                </span>
                                                                            </div>
                                                                            <p className="mb-0 leading-tight">
                                                                                {item.shortDescription}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-footer pt-3 pb-3">
                                                                        <div className="item-card9-footer d-flex">
                                                                            <div className="d-flex align-items-center mb-0 mt-auto posted me-3">
                                                                                <div>
                                                                                    <span className="fs-13">
                                                                                        {" "}
                                                                                        Available at - {item.hospital}
                                                                                    </span>
                                                                                    <small className="d-block text-default">
                                                                                        {item.zip}
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                            <div className="ms-auto">
                                                                                <span className="me-4">
                                                                                    <FontAwesomeIcon icon={faCalendar} />{" "}
                                                                                    {item.available_days}
                                                                                </span>
                                                                                <span className="me-4">
                                                                                    <FontAwesomeIcon icon={faClock} />{" "}
                                                                                    {item.available_time}
                                                                                </span>
                                                                                <span className="reviewText me-5">
                                                                                    {item.rating} <FontAwesomeIcon icon={faStar} />
                                                                                </span>
                                                                                <Link href={item.doctorId} className="text-primary viewDetailsBtn">
                                                                                    View Profile <FontAwesomeIcon icon={faChevronRight} />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="center-block text-center">
                                        {button > 1 && <ul className="pagination mb-5 mb-lg-0">
                                            <li className="page-item page-prev disabled">
                                                <button className="page-link" onClick={() => pagination(idx - 1)} tabIndex={-1}>
                                                    Prev
                                                </button>
                                            </li>
                                            {
                                                Array.from({ length: totalItems }, (_, i) => <li className="page-item active" key={i}>
                                                    <button className="page-link" onClick={() => pagination(i + 1)} >
                                                        {i + 1}
                                                    </button>
                                                </li>)
                                            }

                                            <li className="page-item page-next">
                                                <button className="page-link" onClick={() => pagination(idx + 1)}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>}
                                    </div>
                                </div>
                            </div>
                            {/*/Restaurants lists*/}
                        </div>

                        <div className="offcanvas offcanvas-end filterMainSec" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Select Filter</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                            </div>
                            <div className="offcanvas-body">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Cuisines</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="" id="container">
                                            <div className="filter-product-checkboxs">
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                    <span className="custom-control-label">
                                                        South Indian
                                                        <span className="label label-secondary float-end">
                                                            14
                                                        </span>
                                                    </span>
                                                </label>
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                    <span className="custom-control-label">
                                                        North Indian
                                                        <span className="label label-secondary float-end">
                                                            14
                                                        </span>
                                                    </span>
                                                </label>
                                                <label className="custom-control form-checkbox mb-3">
                                                    <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                    <span className="custom-control-label">
                                                        African
                                                        <span className="label label-secondary float-end">
                                                            10
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Price Range</h3>
                                    </div>
                                    <div className="card-body">
                                        <h6>
                                            <label htmlFor="price">Price Range:</label>
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
                                        <h3 className="card-title">More Filters</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                <span className="custom-control-label">Wheelchair Accessible</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Credit Card</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Buffet</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox3" defaultValue="option3" />
                                                <span className="custom-control-label">Sunday Brunch</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox4" defaultValue="option4" />
                                                <span className="custom-control-label">Desserts and Bakes</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox5" defaultValue="option5" />
                                                <span className="custom-control-label">Cafés</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox6" defaultValue="option6" />
                                                <span className="custom-control-label">Online bookings</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox7" defaultValue="option7" />
                                                <span className="custom-control-label">Hygiene Rated</span>
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
                </div>
            </section>
            {/*/Restaurants Listings*/}
        </>
    )
}