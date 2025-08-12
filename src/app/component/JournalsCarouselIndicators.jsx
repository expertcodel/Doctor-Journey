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
        if (!slides || slides.length === 0) return;
        // Initialize Swiper
        swiperRef.current = new Swiper(".indicatorSwiper", {
        slidesPerView: Math.min(3, slides.length), // Show 4 thumbnails at a time
        spaceBetween: 4, // Spacing between slides
        freeMode: true, // Enable free scrolling
        grabCursor: true, // Enable mouse dragging
        navigation: false, // Show next/prev buttons
        loop: slides.length > 2,
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: Math.min(3, slides.length),
            },
            768: {
                slidesPerView: Math.min(2, slides.length),
            },
            1280: {
                slidesPerView: Math.min(3, slides.length),
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
                {slides && slides.map((src, idx) => (
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
                        unoptimized
                        src={src}
                        fill
                        alt={src}
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
