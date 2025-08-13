"use client";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

export default function JournalsThumbCarousel({ journalList }) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView={3}
      spaceBetween={16}
      freeMode={true}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: { slidesPerView: 1.2, spaceBetween: 10 },
        768: { slidesPerView: 2.5, spaceBetween: 8 },
        1280: { slidesPerView: 3, spaceBetween: 16 },
      }}
      className="journalsThumb-slider customSwiper"
    >
      {journalList.map((journal) => (
        <SwiperSlide className="jrLargeCard" key={journal.journalsId}>
          <div className="card">
            <div className="card-body">
              <div className="cat-item">
                <Link href={`/journals/${journal.journalsUrl}`} />
                <div className="cat-img bg-primary-transparent">
                  <Image
                    unoptimized
                    src={journal.imageUrl}
                    className="img-fluid"
                    fill
                    alt=""
                  />
                </div>
                <div className="cat-desc">
                  <h5>
                    {journal.journalsName?.substr(0, 50)}{" "}
                    {journal.journalsName?.length > 50 && "..."}
                  </h5>
                  <small className="badge">
                    INR {journal.price_level_1}/
                  </small>
                  <div className="catFooter">
                    <Link
                      href={`/journals/${journal.journalsUrl}`}
                      className="btn btn-warning"
                    >
                      Read Now
                    </Link>
                    <Link
                      href={`/journals/${journal.journalsUrl}`}
                      className="btn btn-primary"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
