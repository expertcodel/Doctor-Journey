"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Link from "next/link";
import Image from "next/image";

export default function JournalsVerticalCarousel({ journalLeftlist = [], journalRightlist = [] }) {
  return (
    <>
        <div className="JournalsVertical-slider-wrapper verticalSlider">
            {/* Left List Carousel */}
            {journalLeftlist.length > 0 && (
                <Swiper
                    direction="vertical"
                    slidesPerView={4}
                    spaceBetween={16}
                    grabCursor={true}
                    loop={true}
                    autoHeight={true}
                    modules={[Autoplay]}
                    autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                    320: { slidesPerView: 3, spaceBetween: 8 },
                    768: { slidesPerView: 2.5, spaceBetween: 8 },
                    1280: { slidesPerView: 4, spaceBetween: 8 }
                    }}
                    className="JournalsVertical-slider"
                >
                    {journalLeftlist.map((journal) => (
                    <SwiperSlide key={journal.journalsId}>
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                <Link href={`/journals/${journal.journalsUrl}`} />
                                <div className="cat-img bg-primary-transparent">
                                    <Image unoptimized src={journal.imageUrl} className="img-fluid" fill alt="" />
                                </div>
                                <div className="cat-desc">
                                    <h5>{journal.journalsName}</h5>
                                    <small className="badge">INR {journal.price_level_1}/</small>
                                </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Right List Carousel */}
            {journalRightlist.length > 0 && (
                <Swiper
                    direction="vertical"
                    slidesPerView={4}
                    spaceBetween={16}
                    grabCursor={true}
                    loop={true}
                    autoHeight={true}
                    modules={[Autoplay]}
                    autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                    320: { slidesPerView: 3, spaceBetween: 8 },
                    768: { slidesPerView: 2.5, spaceBetween: 8 },
                    1280: { slidesPerView: 4, spaceBetween: 8 }
                    }}
                    className="JournalsVertical-slider"
                >
                    {journalRightlist.map((journal) => (
                    <SwiperSlide key={journal.journalsId}>
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                <Link href={`/journals/${journal.journalsUrl}`} />
                                <div className="cat-img bg-primary-transparent">
                                    <Image unoptimized src={journal.imageUrl} className="img-fluid" fill alt="" />
                                </div>
                                <div className="cat-desc">
                                    <h5>{journal.journalsName}</h5>
                                    <small className="badge">INR {journal.price_level_1}/</small>
                                </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>

    </>
  );
}
