"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select2Component from "../component/Select2Component";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faBuilding, faChevronRight, faClock, faFilter, faLocation, faLocationArrow, faStar, faUsd, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState([50, 80]);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect unauthenticated users
    }
  }, [user]);

  return (
    <section>
        
        <div
            className="cover-image sptb-1 bg-background"
            data-image-src="../assets/images/banners/banner1.jpg"
            >
            <div className="header-text1 mb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                            <div className="text-center text-white ">
                                <h1 className="mb-5">
                                    <span className="font-weight-bold">4,000</span> Restaurants Available
                                    In Australia
                                    </h1>
                            </div>
                            <div className="search-background bg-transparent">
                                <div className="form row no-gutters ">
                                    <div className="col-xl-4 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                        <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" />
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
                                        <a href="javascript:void(0);" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                        Search Here
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /header-text */}
        </div>

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
                                                    <Select2Component id="select1" options={[ { value: "1", label: "Relavant" }, { value: "2", label: "Newest First" }, { value: "3", label: "Highest Paid" }, { value: "4", label: "Lowest Paid" }, { value: "5", label: "High Ratings" }, { value: "6", label:
                                                    "Popular" }, ]} select2Options={{ placeholder: "Select a fruit", allowClear: true }} showSearch={false} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-content">
                                        <div className="tab-pane active">
                                            {/* customCard */}
                                            <div className="card overflow-hidden br-0 overflow-hidden customCard">
                                                <div className="customCardSec">
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            {/* <Link href="/user-dashboard" /> */}
                                                            <div id="carouselExampleIndicators" className="carousel slide customCarousel" data-bs-ride="carousel">
                                                                <div className="carousel-indicators">
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                                                                </div>
                                                                <div className="carousel-inner">
                                                                    <div className="carousel-item active">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                                                                                alt="img"
                                                                                className="cover-image"
                                                                            />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_2.avif" width={675} height={450}
                                                                                alt="img"
                                                                                className="cover-image"
                                                                            />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_3.avif" width={675} height={450}
                                                                                alt="img"
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
                                                                <Link href="/" className="text-dark">
                                                                    <h4 className="font-weight-semibold mt-1">
                                                                        Chica Loca By Sunny Leone
                                                                    </h4>
                                                                </Link>
                                                                <div className="mt-2 mb-2">
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faLocation} />{" "}
                                                                        2.9 km
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUsd} />{" "}
                                                                        200 per person
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faClock} />{" "}
                                                                        24 x 7
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                                                        Family
                                                                    </span>
                                                                </div>
                                                                <p className="mb-0 leading-tight">
                                                                    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="d-flex align-items-center mb-0 mt-auto posted me-3">
                                                                    <div>
                                                                        <span className="fs-13">
                                                                            {" "}
                                                                            Sigma 2, Greater Noida
                                                                        </span>
                                                                        <small className="d-block text-default">
                                                                            110006
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="ms-auto">
                                                                    <span className="reviewText me-5">
                                                                        4.2 <FontAwesomeIcon icon={faStar} />
                                                                    </span>
                                                                    <Link href="/user-dashboard/details/1" className="text-primary viewDetailsBtn">
                                                                        View Details <FontAwesomeIcon icon={faChevronRight} />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            <figure className="mapSec">
                                                                <iframe
                                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.036170025595!2d77.38451417528428!3d28.508559475732667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce96321851ef1%3A0x4d4ed50afb4ae0f!2sChica%20Loca%20by%20Sunny%20Leone!5e0!3m2!1sen!2sin!4v1743482822497!5m2!1sen!2sin"
                                                                    width="100%"
                                                                    height="100%"
                                                                    style={{ border: 0 }}
                                                                    allowFullScreen
                                                                    loading="lazy"
                                                                    referrerPolicy="no-referrer-when-downgrade"
                                                                ></iframe>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* customCard */}
                                            <div className="card overflow-hidden br-0 overflow-hidden customCard">
                                                <div className="customCardSec">
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            <div id="carouselExampleIndicators2" className="carousel slide customCarousel" data-bs-ride="carousel">
                                                                <div className="carousel-indicators">
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to={1} aria-label="Slide 2" />
                                                                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to={2} aria-label="Slide 3" />
                                                                </div>
                                                                <div className="carousel-inner">
                                                                    <div className="carousel-item active">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_2.avif" width={675} height={450}
                                                                                alt="img"
                                                                                className="cover-image"
                                                                            />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                                                                                alt="img"
                                                                                className="cover-image"
                                                                            />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <figure>
                                                                            <Image
                                                                                src="/images/restaurant/restaurant_3.avif" width={675} height={450}
                                                                                alt="img"
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
                                                                <Link href="/" className="text-dark">
                                                                    <h4 className="font-weight-semibold mt-1">
                                                                        DutyFree - Your Everyday BYOB
                                                                    </h4>
                                                                </Link>
                                                                <div className="mt-2 mb-2">
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faLocation} />{" "}
                                                                        2.9 km
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUsd} />{" "}
                                                                        200 per person
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faClock} />{" "}
                                                                        24 x 7
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                                                        Family
                                                                    </span>
                                                                </div>
                                                                <p className="mb-0 leading-tight">
                                                                    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="d-flex align-items-center mb-0 mt-auto posted">
                                                                    <div>
                                                                        <span className="fs-13">
                                                                            {" "}
                                                                            Sigma 2, Greater Noida
                                                                        </span>
                                                                        <small className="d-block text-default">
                                                                            110006
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="ms-auto">
                                                                    <span className="reviewText">
                                                                        4.2 <FontAwesomeIcon icon={faStar} />
                                                                    </span>
                                                                    {/* <a href="jobs.html" className="me-3">
                                                                        <i className="ion-checkmark-circled text-success me-1" /> Phone Verified
                                                                    </a>
                                                                    <a href="jobs.html" className="btn btn-primary">
                                                                        {" "}
                                                                        Apply Now
                                                                    </a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            <a href="/" target="_blank" />
                                                            <figure className="mapSec">
                                                                <Image
                                                                    src="/images/restaurant/map.webp" width={675} height={450}
                                                                    alt="img"
                                                                    className="cover-image"
                                                                />
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* customCard */}
                                            <div className="card overflow-hidden br-0 overflow-hidden customCard">
                                                <div className="customCardSec">
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            <Link href="/" />
                                                            <figure>
                                                                <Image
                                                                    src="/images/restaurant/restaurant_3.avif" width={675} height={450}
                                                                    alt="img"
                                                                    className="cover-image"
                                                                />
                                                            </figure>
                                                        </div>
                                                    </div>
                                                    <div className="card overflow-hidden  border-0 box-shadow-0 border-start br-0 mb-0">
                                                        <div className="card-body pt-3 pt-md-5">
                                                            <div className="item-card9">
                                                                <Link href="/" className="text-dark">
                                                                    <h4 className="font-weight-semibold mt-1">
                                                                        Ru-Bar-Ru
                                                                    </h4>
                                                                </Link>
                                                                <div className="mt-2 mb-2">
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faLocation} />{" "}
                                                                        2.9 km
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUsd} />{" "}
                                                                        200 per person
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faClock} />{" "}
                                                                        24 x 7
                                                                    </span>
                                                                    <span className="me-4">
                                                                        <FontAwesomeIcon icon={faUserFriends} />{" "}
                                                                        Family
                                                                    </span>
                                                                </div>
                                                                <p className="mb-0 leading-tight">
                                                                    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="d-flex align-items-center mb-0 mt-auto posted">
                                                                    <div>
                                                                        <span className="fs-13">
                                                                            {" "}
                                                                            Sigma 2, Greater Noida
                                                                        </span>
                                                                        <small className="d-block text-default">
                                                                            110006
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                                <div className="ms-auto">
                                                                    <span className="reviewText">
                                                                        4.2 <FontAwesomeIcon icon={faStar} />
                                                                    </span>
                                                                    {/* <a href="jobs.html" className="me-3">
                                                                        <i className="ion-checkmark-circled text-success me-1" /> Phone Verified
                                                                    </a>
                                                                    <a href="jobs.html" className="btn btn-primary">
                                                                        {" "}
                                                                        Apply Now
                                                                    </a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 m-0 item-card9-img">
                                                        <div className="item-card9-imgs">
                                                            <a href="/" target="_blank" />
                                                            <figure className="mapSec">
                                                                <Image
                                                                    src="/images/restaurant/map.webp" width={675} height={450}
                                                                    alt="img"
                                                                    className="cover-image"
                                                                />
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="tab-pane" id="tab-12">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img1.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        HR Executive Jobs
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Pro.Meet
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Bromley
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 15,000-20,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Full Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" />{" "} HR/Admin
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img2.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        Required Web Designer
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Infratech Ltd{" "}
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Antegria
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 15,000-20,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Full Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" /> Web Design
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img3.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        Customer Care Jobs
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Genius Tech
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Bartovia
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 10,000-15,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Part Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" /> BPO
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img4.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        Accountant Jobs
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Alpha Solution
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Carpania
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 30,000-40,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Full Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" /> Accounts
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img5.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        Sales Executive Jobs
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Flowtech
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Deltora
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 10,000-15,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Full Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" /> BPO
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xl-4">
                                                    <div className="card overflow-hidden">
                                                        <div className="item-card9-img border-bottom">
                                                            <div className="item-card9-imgs">
                                                                <a href="jobs.html" />
                                                                <img src="../assets/images/products/logo/img6.png" alt="img" className="h-100" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="item-card9">
                                                                <a href="jobs.html" className="text-dark mt-2">
                                                                    <h4 className="font-weight-semibold mt-1 mb-2">
                                                        Hard ware Engineer Jobs
                                                        </h4>
                                                                </a>
                                                                <ul className="icon-card mb-0 mt-1">
                                                                    <li className="">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-building-o text-muted me-1" />{" "} Hard Tch Ltd
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-map-marker text-muted me-1" />{" "} Estoccia
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-usd text-muted me-1" />{" "} 20,000-30,000
                                                                        </a>
                                                                    </li>
                                                                    <li className="mb-0">
                                                                        <a href="javascript:void(0);" className="icons">
                                                                            <i className="fa fa-clock-o text-muted me-1" />{" "} Full Time
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p className="mb-0 mt-2">
                                                                    Ut enim ad minima veniamq nostrum exerci ullam orisin suscipit laboriosam
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="card-body p-3 px-5">
                                                            <a href="jobs.html" className="icons">
                                                                <i className="fa fa-user text-muted me-1" /> IT Hardware
                                                            </a>
                                                            <a className="float-end">
                                                                <i className="ion-checkmark-circled text-success me-1" />{" "} Phone Verified
                                                            </a>
                                                        </div>
                                                        <div className="card-footer pt-3 pb-3">
                                                            <div className="item-card9-footer d-flex">
                                                                <div className="btn-block">
                                                                    <a href="jobs.html" className="btn btn-block btn-primary">
                                                        {" "}
                                                        Apply Now
                                                        </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="center-block text-center">
                                    <ul className="pagination mb-5 mb-lg-0">
                                        <li className="page-item page-prev disabled">
                                            <a className="page-link" href="javascript:void(0);" tabIndex={-1}>
                                            Prev
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="javascript:void(0);">
                                            1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="javascript:void(0);">
                                            2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="javascript:void(0);">
                                            3
                                            </a>
                                        </li>
                                        <li className="page-item page-next">
                                            <a className="page-link" href="javascript:void(0);">
                                            Next
                                            </a>
                                        </li>
                                    </ul>
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
                                        <Slider
                                            range
                                            min={0}
                                            max={100}
                                            value={value}
                                            onChange={(val) => setValue(val)}
                                        />
                                        <p>Value: {value[0]} - {value[1]}</p>
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

    </section>
  );
}
