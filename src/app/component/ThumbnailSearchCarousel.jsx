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

export default function ThumbnailSearchCarousel({specialization}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".thumbs-slider", {
      slidesPerView: 4, // Show 4 thumbnails at a time
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
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 4, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper thumbs-slider customSwiper cneterAlignSlider">
        <div className="swiper-wrapper">
         {specialization.map((item,i)=><div key={i} className={i===0?"swiper-slide item":"swiper-slide"}>
            <div className="card mb-0">
              <div className="card-body p-3">
                  <div className="cat-item d-flex">
                      <Link href={`/doctors?category=${item.departmentName}`} />
                      <div className="cat-img me-4 bg-primary-transparent p-3 brround">
                          <Image src={item.icon} className="image-serve" alt="img" width={520} height={520} />
                          <Image src="/images/products/categories/operator-white.png" className="image-service-white" alt="img" width={520} height={520} />
                      </div>
                      <div className="cat-desc text-start">
                          <h5 className="mb-3 mt-0">{item.departmentName}</h5>
                          <small className="badge rounded-pill badge bg-primary me-2">
                           {item.count} videos
                          </small>
                      </div>
                  </div>
              </div>
            </div>
          </div>)}
         
        </div>
      </div>
    </>
  );
}
