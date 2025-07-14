
import Image from 'next/image';
import EventsBanner from '../component/EventsBanner';
import Select2Component from "../component/Select2Component";
import Link from 'next/link';
import ThumbnailSearchCarousel from "../component/ThumbnailSearchCarousel";
import ThumbnailEventsCarousel from "../component/ThumbnailEventsCarousel";
import eventsCards from "../../data/eventsCards.json";
import ThumbnailEventGalleryCarousel from "../component/ThumbnailEventGalleryCarousel";
import AnimatedCounter from "../component/AnimatedCounter";
import ParticipateOrganisation from "../component/ParticipateOrganisation";
import UpcomingEventsCarousel from "../component/UpcomingEventsCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEye, faFaceSmile, faGlobe, faHeadphones, faMapMarkerAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
export default function Events() {
    return (
        <section>
            <EventsBanner />
      
            {/* search engine */}
            <section className="banner-1 cover-image sptb-3 pb-14 sptb-tab bg-background2"
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
                {/* /header-text */}

                <div className="header-slider-img">
                <div className="container">
                    <ThumbnailSearchCarousel />
                </div>
                </div>
            </section>

            {/* upcoming events */}
            <section className="sectionSpace sptb aboutMain bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                Our upcoming events
                                <Link href="/doctors">See all</Link>
                            </h4>
                        </div>
                    </div>
        
                    <div className="row g-md-4 g-3">
                        <div className='col-12'>
                            <div className="upcomingEventsBox">
                                {/* <div className="row g-md-4 g-3">
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
                                            <div className="customInputWrapper p-3 rounded-4 border border-secondary-subtle bg-white">
                                                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text bg-white border-0">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                    </span>
                                                    <input type="text" className="form-control border-0" defaultValue="Vallabhbhai Patel Chest Institute. New Delhi" disabled readOnly="" />
                                                </div>
                                                
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white border-0">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                    </span>
                                                    <input type="text" className="form-control border-0" defaultValue="02 December, 2025" disabled readOnly="" />
                                                </div>
                                            </div>

                                            <div className='d-flex'>
                                                <Link className="btn btn-primary me-2" href="/">
                                                    More About
                                                </Link>
                                                <Link className="btn btn-info" href="/">
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <UpcomingEventsCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* organization Events */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                organization Events
                                <Link href="/doctors">See all</Link>
                            </h4>
                        </div>
                    </div>
        
                    <div className="row g-md-4 g-3">
                        {eventsCards.map((card) => (
                            <div className="col-xl-4 col-lg-6 col-12 drCard" key={card.eventId}>
                                <div className="card mb-0">
                                    <div className="item7-card-img">
                                        <Link href={`/events/${card.eventId}`} />
                                        <Image src={card.thumbnailImage} fill alt="img" className="cover-image" unoptimized />
                                    </div>
                                    <div className="card-body">
                                        <Link href={`/events/${card.eventId}`} className="text-dark">
                                            <p className="font-weight-semibold">{card.eventTitle}</p>
                                        </Link>               
                                        <div className="item7-card-desc d-flex">
                                            <span>{card.eventDate}</span>
                                        </div>
                                        <Link href={`/events/${card.eventId}`} className="btn btn-primary mt-3">
                                            Read Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* organization Events */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                Our archives Events
                                <Link href="/doctors">See all</Link>
                            </h4>
                        </div>
                    </div>
        
                    <ThumbnailEventsCarousel />
                </div>
            </section>

            <section className="sptb bg-white">
                <div className="container">
                    <ParticipateOrganisation />
                </div>
            </section>

            {/* Events Gallery */}
            <section className="sectionSpace sptb bg-white">
                <ThumbnailEventGalleryCarousel />
            </section>

            {/*animation metter*/}
            <section className="sptb bg-white">
                <div className="container">
                    <div className="section-title center-block text-center">
                        <h1>JOURNEY AT A GLANCE</h1>
                        <p>
                            Enthusiasts dedicated to building remarkable program!
                        </p>
                    </div>

                    <div className="row text-center no-gutters metterAnimationBox">
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="counter-status md-mb-0 sptb mt-5 mt-md-0">
                                <div className="counter-icon">
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </div>
                                <h5>EVENTS COMPLETED</h5>
                                <AnimatedCounter target={2569} />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="counter-status status-1 md-mb-0 sptb">
                                <div className="counter-icon text-warning">
                                    <FontAwesomeIcon icon={faFaceSmile} />
                                </div>
                                <h5>HAPPY PARTICIPANTS</h5>
                                <AnimatedCounter target={1765} />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="counter-status status md-mb-0 sptb">
                                <div className="counter-icon text-primary">
                                    <FontAwesomeIcon icon={faGlobe} />
                                </div>
                                <h5>COUNTRIES REACH</h5>
                                <AnimatedCounter target={846} />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <div className="counter-status status sptb">
                                <div className="counter-icon text-success">
                                    <FontAwesomeIcon icon={faHeadphones} />
                                </div>
                                <h5>EMINENT SPEAKERS</h5>
                                <AnimatedCounter target={7253} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*animation metter*/}

            {/*post section*/}
            <section>
                <div className="cover-image sptb bg-background-color" data-image-src="../assets/images/banners/banner4.jpg">
                    <div className="content-text mb-0">
                        <div className="content-text mb-0">
                            <div className="container">
                                <div className="text-center text-white section-title">
                                    <h1 className="mb-2">Verify Certificate</h1>
                                    <p className="fs-16">
                                        Do you have a valid certificate?
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-8 mx-auto d-block">
                                            <div className="mt-5">
                                                <div className="input-group sub-input mt-1">
                                                    <input type="text" className="form-control input-lg " placeholder="Enter your certificate number" />
                                                    <div className="">
                                                        <button type="button" className="btn btn-secondary  btn-lg br-tr-3  br-br-3">
                                                            Validate
                                                        </button>
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
            {/*/post section*/}
        </section>
    )
}