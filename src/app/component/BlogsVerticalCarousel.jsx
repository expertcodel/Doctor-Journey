"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Link from "next/link";
import Image from "next/image";

export default function BlogsVerticalCarousel({ blog }) {
  return (
    <>
        <div className="Blogs-slider-wrapper verticalSlider">
            <Swiper
                direction="vertical"
                slidesPerView={4}
                spaceBetween={16}
                grabCursor={true}
                loop={true}
                autoHeight={true}
                modules={[Autoplay]}
                autoplay={{
                delay: 50000000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 8 },
                    768: { slidesPerView: 2, spaceBetween: 8 },
                    1280: { slidesPerView: 2, spaceBetween: 16 }
                }}
                className="Blogs-slider"
            >
                {blog.map((item, id) => (
                    <SwiperSlide key={id}>
                        <div className="card mb-0">
                            <div className="item7-card-img">
                                <Link href={`/blogs${item.blogUrl}`} />
                                <Image src={item.blogImage} alt={item.blogTitle} className="cover-image" fill unoptimized />
                            </div>
                            <div className="card-body">
                                <Link href={`/blogs${item.blogUrl}`} className="text-dark">
                                    <h4 className="font-weight-semibold m-0">{item.blogTitle}</h4>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    </>
  );
}
