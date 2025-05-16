"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import doctorArticle from "@/data/doctorArticle.json";
import { faCalendar, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ThumbnailVArticleCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".article-slider", {
        direction: "vertical",
        slidesPerView: 2.3, // Show 4 thumbnails at a time
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
                slidesPerView: 2.2, // 3 slides for tablets
                spaceBetween: 8
            },
            1280: {
                slidesPerView: 2.3, // 3 slides for tablets
                spaceBetween: 16
            },
        }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper article-slider customSwiper verticalSwiperArticle">
        <div className="swiper-wrapper">
            {
                doctorArticle.map((item, idx) => (
                    <div className="swiper-slide" key={idx}>
                        <div className="card overflow-hidden br-0 overflow-hidden customCard articleCard">
                            <div className="customCardSec">
                                <div className="p-0 m-0 item-card9-img">
                                    <div className="item-card9-imgs">
                                        {/* <Link href="/user-dashboard" /> */}
                                        <div id={`carousel-${item.id}`} className="carousel slide customCarousel" data-bs-ride="carousel">
                                            {/* <div className="carousel-indicators">
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                                            </div> */}
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <figure>
                                                        <Image
                                                            src={item.image} width={200} height={242}
                                                            alt={item.name}
                                                            className="cover-image"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card overflow-hidden  border-0 box-shadow-0 border-start br-0 mb-0">
                                    <div className="card-body pt-3 pt-md-5">
                                        <div className="item-card9">
                                            <Link href={item.article_link} className="text-dark">
                                                <h4 className="font-weight-semibold mt-1">
                                                    {item.title}
                                                </h4>
                                            </Link>
                                            <div className="mt-2 mb-2">
                                                <span className="me-4">
                                                    <FontAwesomeIcon icon={faCalendar} />{" "}
                                                    Posted {item.date}
                                                </span>
                                            </div>
                                            <p className="mb-0 leading-tight">
                                            {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-footer pt-3 pb-3">
                                        <div className="item-card9-footer d-flex">
                                            <div className="d-flex align-items-center mb-0 mt-auto posted me-3">
                                                <div>
                                                    <span className="fs-13">
                                                        {" "}
                                                        {item.views}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ms-auto">
                                                <Link href={item.article_link} className="text-primary viewDetailsBtn">
                                                    Read Article <FontAwesomeIcon icon={faChevronRight} />
                                                </Link>
                                            </div>
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