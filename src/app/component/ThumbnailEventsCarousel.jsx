"use client";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import eventsCards from "../../data/eventsCards.json";

export default function ThumbnailEventsCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".event-slider", {
      slidesPerView: 3, // Show 4 thumbnails at a time
      spaceBetween: 16, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1, // 1 slide for mobile
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper event-slider customSwiper row g-md-4 g-3">
        <div className="swiper-wrapper">
            {eventsCards.map((card) => (
                <div className="swiper-slide drCard" key={card.eventId}>
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
    </>
  );
}
