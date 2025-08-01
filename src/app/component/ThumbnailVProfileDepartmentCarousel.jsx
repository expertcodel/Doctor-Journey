"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ThumbnailVProfileDepartmentCarousel({specialization}) {
  return (
    <>
        <div className="list-group mb-0 customSpecialization specialization-slider-wrapper verticalSlider">
            <Swiper
                direction="vertical"
                slidesPerView={5}
                spaceBetween={0}
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
                    320: { slidesPerView: 3, spaceBetween: 0 },
                    768: { slidesPerView: 4, spaceBetween: 0 },
                    1280: { slidesPerView: 5, spaceBetween: 0 }
                }}
                className="specialization-slider"
            >
                {
                    specialization[0].map((item, id) => (
                        <SwiperSlide key={id} className="list-group-item">
                            <Link href={`/doctors?category=${item.departmentName}`} className="text-dark">
                                <span className="specializationIcon">
                                    <Image src={item.icon} className="img-fluid" fill alt="img" unoptimized />
                                </span> {item.departmentName}
                                <span className="badgetext badge rounded-pill bg-light mb-0 mt-1">
                                    {item.count}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </>
  );
}