"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ThumbnailVDrProfileCarousel({doctorProfile}) {
  return (
    <>
        <div className="profile-slider-wrapper verticalSlider customSwiper verticalSwiperProfile">
            <Swiper
                direction="vertical"
                slidesPerView={5}
                spaceBetween={12}
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
                    768: { slidesPerView: 4, spaceBetween: 8 },
                    1280: { slidesPerView: 5, spaceBetween: 12 }
                }}
                className="profile-slider"
            >
                {
                    doctorProfile.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="drShortDesc p-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="cat-item">
                                            <Link href={`${item.userId}`} />
                                            <div className="cat-img bg-primary-transparent brround">
                                                <Image src={item.profileImage} className="img-fluid" fill alt={item.doctorName} unoptimized/>
                                            </div>
                                            <div className="cat-desc">
                                                <h5>
                                                    {item.doctorName} <span>{item.qualification} | {item.specialization}</span>
                                                </h5>
                                                <small className="badge">
                                                    view Details
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </>
  );
}