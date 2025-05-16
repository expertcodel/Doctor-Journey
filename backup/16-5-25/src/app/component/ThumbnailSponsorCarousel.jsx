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

export default function ThumbnailSponsorCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".sponsor-slider", {
      slidesPerView: 5, // Show 4 thumbnails at a time
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
          slidesPerView: 4, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 5, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper sponsor-slider customSwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide item">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/1.png" width={220} height={130} alt="company1" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/2.png" width={220} height={130} alt="company2" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/3.png" width={220} height={130} alt="company3" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/4.png" width={220} height={130} alt="company4" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/5.png" width={220} height={130} alt="company5" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/6.png" width={220} height={130} alt="company6" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/7.png" width={220} height={130} alt="company7" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/8.png" width={220} height={130} alt="company8" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/9.png" width={220} height={130} alt="company9" />
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="card-body">
                    <Image src="/images/clients/1.png" width={220} height={130} alt="company1" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}