"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import doctorProfile from "@/data/doctorProfile.json";
import { faCalendar, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ThumbnailVDrProfileCarousel({doctorProfile}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".profile-slider", {
        direction: "vertical",
        slidesPerView: 4.7, // Show 4 thumbnails at a time
        spaceBetween: 16, // Spacing between slides
        freeMode: true, // Enable free scrolling
        grabCursor: true, // Enable mouse dragging
        navigation: false, // Show next/prev buttons
        loop: true,
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 2.7, // 1 slide for mobile
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3.7, // 3 slides for tablets
                spaceBetween: 8
            },
            1280: {
                slidesPerView: 4.7, // 3 slides for tablets
                spaceBetween: 16
            },
        }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper profile-slider customSwiper verticalSwiperProfile">
        <div className="swiper-wrapper">
            {
                doctorProfile.map((item, idx) => (
                    <div className="swiper-slide" key={idx}>
                        <div className="col-md-12 col-12 drShortDesc">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href={`${item.doctorId}`} />
                                        <div className="cat-img bg-primary-transparent brround">
                                            <Image src={item.profileImage} className="img-fluid" width={155} height={80} alt={item.doctorName} unoptimized/>
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                {item.doctorName} <span>{item.qualification}</span>
                                            </h5>
                                            <small className="badge">
                                                view Details
                                            </small>
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
    </>
  );
}