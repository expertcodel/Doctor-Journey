"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import Link from "next/link";

export default function AuthorsThumbCarousel({ doctorProfile }) {
    return (
        <Swiper
        modules={[Autoplay, FreeMode]}
        autoplay={{
            delay: 4000,
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
            320: { slidesPerView: 1, spaceBetween: 8 },
            768: { slidesPerView: 2, spaceBetween: 8 },
            1280: { slidesPerView: 3, spaceBetween: 16 },
        }}
        className="eventGallery-slider customSwiper"
        >
        {doctorProfile.map((item, index) => (
            <SwiperSlide key={index}>
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="cat-item">
                            <Link href={`/doctor-profile/${item.doctorId}`} />
                            <div className="cat-img bg-primary-transparent brround">
                                <Image unoptimized src={item.profileImage} className="img-fluid" fill alt="" />
                            </div>
                            <div className="cat-desc">
                                <h5>
                                    {item.doctorName} <span>{item.qualification}</span>
                                </h5>
                                <small className="badge">
                                    view Details
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ))}
        </Swiper>
    );
}
