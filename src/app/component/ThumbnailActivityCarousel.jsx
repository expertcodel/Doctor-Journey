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
import doctorCards from "@/data/doctorCards.json";

export default function ThumbnailActivityCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".activity-slider", {
      slidesPerView: 2.1, // Show 4 thumbnails at a time
      spaceBetween: 16, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1.2, // 1 slide for mobile
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2.1, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 2.5, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper activity-slider customSwiper">
        <div className="swiper-wrapper">
            {
                doctorCards.map((card) => (
                    <div key={card.id} className="swiper-slide">
                        <div className="drCard">
                            <div className="card mb-0">
                                <div className="item7-card-img">
                                    <Link href={`/doctors/${card.id}`} />
                                    <Image src={card.image} width={368} height={190} alt="img" className="cover-image" />
                                    <div className="play-button">
                                        <span className="triangle"></span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Link href={`/doctors/${card.id}`} className="text-dark">
                                        <h4 className="font-weight-semibold">{card.author}</h4>
                                    </Link>
                                    <p>{card.title2}</p>
                                    <div className="item7-card-desc d-flex">
                                        <span>{card.title}</span>
                                        <div className="ms-auto">
                                            <span>{card.views}</span>
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