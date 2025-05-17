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

export default function JournalsThumbCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".journalsThumb-slider", {
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
      <div className="swiper journalsThumb-slider customSwiper">
        <div className="swiper-wrapper">
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="swiper-slide jrLargeCard">
                {/*** card */}
                <div className="card">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href="/" />
                            <div className="cat-img bg-primary-transparent">
                                <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    Walk into the Shadow
                                </h5>
                                <small className="badge">
                                    INR 1999/
                                </small>
                                <div className="catFooter">
                                    <Link href="/hello" className="btn btn-warning">
                                        Read Now
                                    </Link>
                                    <Link href="/hello2" className="btn btn-primary">
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
