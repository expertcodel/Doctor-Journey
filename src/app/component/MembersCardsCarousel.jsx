"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment, faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function MembersCardsCarousel() {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      autoplay={{
        delay: 4000000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      freeMode={true}
      grabCursor={true}
      loop={true}
      spaceBetween={16}
      slidesPerView={3}
      centeredSlides={false}
      breakpoints={{
        320: { slidesPerView: 1.1, spaceBetween: 8 },
        768: { slidesPerView: 2.5, spaceBetween: 24 },
        1380: { slidesPerView: 3, spaceBetween: 32 },
      }}
      className="MembersCard-slider customSwiper membersCardSlider"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <SwiperSlide key={index} className="item">
            <div className="card mb-0">
              <div className="card-body">
                  <figure>
                    <Image fill src="/images/profile-bg.jpg" alt="img" className="mx-auto d-block img-fluid" />
                  </figure>
                  <div className="item-card2">
                      <div className="item-card2-desc text-center">
                          <div className="item-card2-text mt-3">
                              <Link href="/" className="text-dark">
                                  <h4 className="font-weight-bold">Sid Quebedeaux</h4>
                              </Link>
                          </div>
                          <p className="">Web Developer (6 Yrs Exp)</p>
                          <Link href="/" className="btn btn-white btn-sm ">
                            View Details
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="card-footer">
                  <div className="product-filter-desc">
                      <div className="product-filter-icons text-center">
                          <Link href="/" className="border text-primary p-0">
                              <FontAwesomeIcon icon={faPhone} />
                          </Link>
                          <Link href="/" className="border text-primary p-0">
                              <FontAwesomeIcon icon={faEnvelope} />
                          </Link>
                          <Link href="/" className="border text-primary p-0">
                              <FontAwesomeIcon icon={faComment} />
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
