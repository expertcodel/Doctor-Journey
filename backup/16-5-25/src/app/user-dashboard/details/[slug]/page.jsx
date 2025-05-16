"use client";
import { faCheckCircle, faDirections, faDollar, faLocationDot, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import Isotope from 'isotope-layout';
import imagesLoaded from "imagesloaded";
import Image from 'next/image';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from '@fancyapps/ui';

// Menu Data (instead of hardcoding in JSX)
const menuItems = [
    { name: "Lobster Bisque", price: "$5.95", image: "/assets/img/menu/lobster-bisque.jpg", category: "filter-starters", ingredients: "Lorem, deren, trataro, filede, nerada" },
    { name: "Bread Barrel", price: "$6.95", image: "/assets/img/menu/bread-barrel.jpg", category: "filter-specialty", ingredients: "Lorem, deren, trataro, filede, nerada" },
    { name: "Crab Cake", price: "$7.95", image: "/assets/img/menu/cake.jpg", category: "filter-starters", ingredients: "A delicate crab cake served on a toasted roll with lettuce and tartar sauce" },
    { name: "Caesar Selections", price: "$8.95", image: "/assets/img/menu/caesar.jpg", category: "filter-salads", ingredients: "Lorem, deren, trataro, filede, nerada" },
    { name: "Tuscan Grilled", price: "$9.95", image: "/assets/img/menu/tuscan-grilled.jpg", category: "filter-specialty", ingredients: "Grilled chicken with provolone, artichoke hearts, and roasted red pesto" },
    { name: "Mozzarella Stick", price: "$4.95", image: "/assets/img/menu/mozzarella.jpg", category: "filter-starters", ingredients: "Lorem, deren, trataro, filede, nerada" },
    { name: "Greek Salad", price: "$9.95", image: "/assets/img/menu/greek-salad.jpg", category: "filter-salads", ingredients: "Fresh spinach, crisp romaine, tomatoes, and Greek olives" },
    { name: "Spinach Salad", price: "$9.95", image: "/assets/img/menu/spinach-salad.jpg", category: "filter-salads", ingredients: "Fresh spinach with mushrooms, hard boiled egg, and warm bacon vinaigrette" },
    { name: "Lobster Roll", price: "$12.95", image: "/assets/img/menu/lobster-roll.jpg", category: "filter-specialty", ingredients: "Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll" },
];
 
export default function DetailPage() {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    
        let iso = null;
    
        const onTabClick = (e) => {
          const target = e.target.getAttribute("href");
          if (target === "#tab-2") {
            const container = document.querySelector(".isotope-container");
    
            // Wait until images are loaded
            imagesLoaded(container, () => {
              iso = new Isotope(container, {
                itemSelector: ".isotope-item",
                layoutMode: "masonry",
              });
    
              const filters = document.querySelectorAll(".menu-filters li");
              filters.forEach((filter) => {
                filter.addEventListener("click", function () {
                  filters.forEach((el) => el.classList.remove("filter-active"));
                  this.classList.add("filter-active");
                  const filterValue = this.getAttribute("data-filter");
                  iso.arrange({ filter: filterValue });
                });
              });
            });
          }
        };
    
        // Listen for tab click
        document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) =>
          tab.addEventListener("shown.bs.tab", onTabClick)
        );
    
        // Cleanup
        return () => {
          document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) =>
            tab.removeEventListener("shown.bs.tab", onTabClick)
          );
        };
    }, []);

    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {}); // Initialize Fancybox
        return () => {
        Fancybox.destroy(); // Cleanup on unmount
        };
    }, []);
  return (
    <>
        {/*Breadcrumb*/}
        <section>
            <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                <div className="header-text mb-0">
                    <div className="container">
                        <div className="text-center text-white">
                            <h1 className="">Chica Loca By Sunny Leone</h1>
                            <ol className="breadcrumb text-center">
                                <li className="breadcrumb-item">
                                    <Link href="/user-dashboard">Restaurants</Link>
                                </li>
                                <li className="breadcrumb-item active text-white" aria-current="page">
                                    Chica Loca By Sunny Leone
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Breadcrumb*/}

        {/*User Profile*/}
        <section className="sptb">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body detailCardTop">
                                <div className='row'>
                                    <div className='col-md-5 col-12'>
                                        {/* <Link href="/user-dashboard" /> */}
                                        <div id="carouselExampleIndicators" className="carousel slide customCarousel" data-bs-ride="carousel">
                                            <div className="carousel-indicators">
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1">
                                                    <Image
                                                        src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                                                        alt="img"
                                                        className="cover-image"
                                                    />
                                                </button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2">
                                                    <Image
                                                        src="/images/restaurant/restaurant_2.avif" width={675} height={450}
                                                        alt="img"
                                                        className="cover-image"
                                                    />
                                                </button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3">
                                                    <Image
                                                        src="/images/restaurant/restaurant_3.avif" width={675} height={450}
                                                        alt="img"
                                                        className="cover-image"
                                                    />
                                                </button>
                                            </div>
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <a data-fancybox="carousel-gallery" data-src="/images/restaurant/restaurant_1.avif" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image img-fluid"
                                                        />
                                                    </figure>
                                                </div>
                                                <div className="carousel-item">
                                                    <a data-fancybox="carousel-gallery" data-src="/images/restaurant/restaurant_2.avif" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/restaurant_2.avif" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image img-fluid"
                                                        />
                                                    </figure>
                                                </div>
                                                <div className="carousel-item">
                                                    <a data-fancybox="carousel-gallery" data-src="/images/restaurant/restaurant_3.avif" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/restaurant_3.avif" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image img-fluid"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-md-7 col-12'>
                                        <h3>
                                            Chica Loca By Sunny Leone
                                            <span className='reviewSec'>
                                                <span className="reviewText">
                                                    4.2 <FontAwesomeIcon icon={faStar} />
                                                </span>
                                                <em className='totalReviews'>3620 <span>Reviews</span></em>
                                            </span>
                                        </h3>
                                        <p>
                                            Middle Eastern, North Indian, Seafood
                                        </p>
                                        <p>
                                            Plot C/3, E/1, 401, 4th Floor, Gulshan One 29, Sector 129, Noida
                                        </p>
                                        <ul className='list-unstyled asseList'>
                                            <li>
                                                <span className='hoursSec'>
                                                    <strong className='text-primary'>Open now</strong> - 12noon – 12midnight (Today)
                                                </span>
                                            </li>
                                            <li className='priceTag'>
                                                <FontAwesomeIcon icon={faDollar} /> 200 <span>per person</span>
                                            </li>
                                            <li>
                                                <a href='tel:+918888907980'>
                                                    <FontAwesomeIcon icon={faPhone} className='text-primary' /> +91 8888907980
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className='list-unstyled directionList'>
                                            <li>
                                                <a href='https://maps.app.goo.gl/FPqu71wMigKSLv4h8' target='_blank' />
                                                <FontAwesomeIcon icon={faDirections} /> Direction
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faLocationDot} /> 2.9 km
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
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
                                                        Menu
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-3" data-bs-toggle="tab" className="">
                                                        Reviews
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-4" data-bs-toggle="tab" className="">
                                                        Videos
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
                                        {/* bodySec */}
                                        <div className='bodySec'>
                                            <h4>
                                                Dining Offers
                                            </h4>
                                            {/* offerCards */}
                                            <div className='offerCards'>
                                                {/* offerCard */}
                                                <div className='offerCard'>
                                                    <h5>Pre-Book Offer</h5>
                                                    <p>
                                                        Flat 40% Off
                                                        <span>
                                                            valid from today 12:30PM to 6PM
                                                        </span>
                                                    </p>
                                                </div>
                                                {/* offerCard */}
                                                <div className='offerCard'>
                                                    <h5>Instant Offer</h5>
                                                    <p>
                                                        Flat 20% Off
                                                        <span>
                                                            on bill payments
                                                        </span>
                                                    </p>
                                                </div>
                                                {/* offerCard */}
                                                <div className='offerCard'>
                                                    <h5>Surprice</h5>
                                                    <p>
                                                        Get a scratch card
                                                        <span>
                                                            after every transaction
                                                        </span>
                                                    </p>
                                                </div>
                                                {/* offerCard */}
                                                <div className='offerCard'>
                                                    <h5>Exclusive Offer</h5>
                                                    <p>
                                                        Flat 10% Off
                                                        <span>
                                                            valid on your next dining payment
                                                        </span>
                                                    </p>
                                                </div>
                                                {/* offerCard */}
                                                <div className='offerCard'>
                                                    <h5>Bank Offer</h5>
                                                    <p>
                                                        20% Off on any credit card
                                                        <span>
                                                            and more with other banks
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* bodySec */}
                                        <div className='bodySec'>
                                            <h4>
                                                More Info
                                            </h4>
                                            <ul className='list-unstyled moreInfoList'>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Takeaway Available</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Full Bar Available</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Party Music</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Romantic Dining</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Celebrity Frequented</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Live Music</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Dance Floor</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Serves Cocktails</li>
                                                <li><FontAwesomeIcon icon={faCheckCircle} /> Indoor Seating</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane userprof-tab" id="tab-2">
                                {/*Job listing*/}
                                <div className="card mb-0 border-0">
                                    <div className="card-body">
                                        {/* bodySec */}
                                        <div className='bodySec'>
                                            <h4>
                                                Chica Loca By Sunny Leone Menu
                                            </h4>
                                            
                                            <div className="container isotope-layout customMenuSec">
                                                {/* Menu Filters */}
                                                <div className="row" data-aos="fade-up" data-aos-delay="100">
                                                    <div className="col-lg-12 d-flex p-0">
                                                        <ul className="menu-filters isotope-filters">
                                                            <li data-filter="*" className="filter-active">
                                                                All
                                                            </li>
                                                            <li data-filter=".filter-starters">Starters</li>
                                                            <li data-filter=".filter-salads">Salads</li>
                                                            <li data-filter=".filter-specialty">Specialty</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="row isotope-container" data-aos="fade-up" data-aos-delay="200">
                                                    {menuItems.map((item, index) => (
                                                    <div key={index} className={`col-lg-6 menu-item isotope-item ${item.category}`}>
                                                        <Image src={item.image} width={64} height={64} className="menu-img" alt={item.name} />
                                                        <div className="menu-content">
                                                            <em>{item.name}</em>
                                                            <span>{item.price}</span>
                                                        </div>
                                                        <div className="menu-ingredients">{item.ingredients}</div>
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
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
                                        {/* bodySec */}
                                        <div className='bodySec'>
                                            {/* customVideoSec */}
                                            <div className='customVideoSec'>
                                                {/* videoSec */}
                                                <div className='videoSec'>
                                                    <a data-fancybox="video-gallery" data-src="/images/restaurant/img-1.webp" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/img-1.webp" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                                {/* videoSec */}
                                                <div className='videoSec'>
                                                    <a data-fancybox="video-gallery" data-src="/images/restaurant/img-2.webp" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/img-2.webp" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                                {/* videoSec */}
                                                <div className='videoSec'>
                                                    <a data-fancybox="video-gallery" data-src="/images/restaurant/img-3.webp" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/img-3.webp" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                                {/* videoSec */}
                                                <div className='videoSec'>
                                                    <a data-fancybox="video-gallery" data-src="/images/restaurant/img-4.webp" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/img-4.webp" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                                {/* videoSec */}
                                                <div className='videoSec'>
                                                    <a data-fancybox="video-gallery" data-src="/images/restaurant/img-5.webp" />
                                                    <figure>
                                                        <Image
                                                            src="/images/restaurant/img-5.webp" width={675} height={450}
                                                            alt="img"
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}