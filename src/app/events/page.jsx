
import Image from 'next/image';
import EventsBanner from '../component/EventsBanner';
import Select2Component from "../component/Select2Component";
import Link from 'next/link';
import ThumbnailSearchCarousel from "../component/ThumbnailSearchCarousel";
import ThumbnailEventsCarousel from "../component/ThumbnailEventsCarousel";
import eventsCards from "../../data/eventsCards.json";
import ThumbnailEventGalleryCarousel from "../component/ThumbnailEventGalleryCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
                            <div className="aboutJoinBox">
                                <div className="row g-md-4 g-3">
                                    <div className='col-lg-5 col-md-6 col-12'>
                                        <figure>
                                            <Image src="/images/events/event-gallery-1.webp" fill alt="img" className="cover-image" unoptimized />
                                        </figure>
                                    </div>

                                    <div className='col-lg-7 col-md-6 col-12'>
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
                                </div>
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
                            <div className="col-md-4 col-12 drCard" key={card.eventId}>
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

            {/* organization Events */}
            <section className="sectionSpace sptb bg-white">
                <ThumbnailEventGalleryCarousel />
            </section>
        </section>
    )
}