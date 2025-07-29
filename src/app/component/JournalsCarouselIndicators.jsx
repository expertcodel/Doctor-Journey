'use client';
import { useEffect, useRef } from "react";
import Image from 'next/image';
import Swiper from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function JournalsCarouselIndicators({ slides, activeIndex }) {
    const swiperRef = useRef(null);
    useEffect(() => {
        // Initialize Swiper
        swiperRef.current = new Swiper(".indicatorSwiper", {
        slidesPerView: 5, // Show 4 thumbnails at a time
        spaceBetween: 4, // Spacing between slides
        freeMode: true, // Enable free scrolling
        grabCursor: true, // Enable mouse dragging
        navigation: false, // Show next/prev buttons
        loop: false,
        // Responsive breakpoints
        breakpoints: {
            320: {
            slidesPerView: 3,
            },
            768: {
            slidesPerView: 2.5,
            },
            1280: {
            slidesPerView: 3,
            },
        }
        });
    }, []);

    useEffect(() => {
        if (swiperRef.current && !isNaN(activeIndex)) {
        swiperRef.current.slideTo(activeIndex);
        }
    }, [activeIndex]);

  return (
    <>
        {/* Thumbnail Slider */}
        <div className="swiper indicatorSwiper customSwiper">
            <div className="swiper-wrapper">
                {slides.map((src, idx) => (
                <div className="swiper-slide" key={idx}>
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={idx}
                    className={activeIndex === idx ? 'active' : ''}
                    aria-current={activeIndex === idx ? 'true' : undefined}
                    aria-label={src.alt}
                    >
                    <Image
                        src={src.image}
                        fill
                        alt={src.alt}
                        className="cover-image"
                    />
                    </button>
                </div>
                ))}
            </div>
        </div>
    </>
  );
}
