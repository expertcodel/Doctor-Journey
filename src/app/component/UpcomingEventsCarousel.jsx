"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import CountdownTimer from "./CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function UpcomingEventsCarousel() {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      freeMode={false}
      grabCursor={true}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      centeredSlides={true}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 1, spaceBetween: 0 },
        1280: { slidesPerView: 1, spaceBetween: 0 },
      }}
      className="UpcomingEvents-slider customSwiper"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <SwiperSlide key={index}>
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
